### 问题起因

在生产环境中，`server to server` 的服务出现大量 `TIME_WAIT` 状态的连接。通过 `netstat` 发现，连接不断建立但无法保持。抓取 TCP 包后确认，`request` 和 `response` 中的 `keepalive` 已正确设置，但每个 TCP 连接大约处理 6 次 HTTP 请求后就会关闭。


### 排查分析
在 Golang 中，`IdleConn` 的数量不仅受到 `MaxIdleConns` 的限制，还受到 `MaxIdleConnsPerHost` 的限制。

- **`MaxIdleConns`**：控制整个客户端的连接池中的最大空闲连接数。
- **`MaxIdleConnsPerHost`**：控制每个主机的最大空闲连接数。

在 `http.DefaultTransport` 中，这些参数默认没有显式配置，其中 `MaxIdleConnsPerHost` 的默认值是 2。这意味着每个主机最多只能保留 2 个空闲连接，即使你的客户端允许更多的空闲连接数（通过 `MaxIdleConns` 设置）。

因此，在高并发场景下，如果你没有调整 `MaxIdleConnsPerHost`，可能会导致性能瓶颈。为了提高性能，你可以通过自定义 `http.Transport` 来增加 `MaxIdleConnsPerHost` 的值，例如：

```go
transport := &http.Transport{
    MaxIdleConns:       100,  // 设置整个连接池的最大空闲连接数
    MaxIdleConnsPerHost: 10,  // 设置每个主机的最大空闲连接数
    // 其他配置
}
client := &http.Client{
    Transport: transport,
}
```

通过这种配置，你可以更好地控制连接池行为，提升应用的并发性能。

### 总结
出现大量的 `TIME_WAIT` 状态以及频繁关闭连接的问题，通常与以下几个因素有关：

1. **连接管理配置问题**：
   - `TIME_WAIT` 是 TCP 协议中规定的一种状态，当一方主动关闭连接时，会进入 `TIME_WAIT` 状态，等待 2MSL（Maximum Segment Lifetime）时间，以确保对方接收到了最后的 ACK 确认。这段时间内，端口仍然被占用。
   - 如果你的服务频繁建立和关闭连接，`TIME_WAIT` 状态的连接会大量增加，导致可用端口不足。

2. **`Keep-Alive` 配置问题**：
   - 虽然 `keepalive` 设置了，但如果服务端或客户端的连接池管理不当，可能仍会导致连接频繁关闭。
   - HTTP 的 `Keep-Alive` 机制可以维持 TCP 连接，但需要配合合理的连接池配置，确保连接不会过早关闭。

3. **服务器负载和资源限制**：
   - 高负载情况下，服务器可能会主动关闭连接，尤其是在连接数超过设定阈值时。
   - 可以检查系统资源（如文件描述符、网络缓冲区）是否足够。

4. **配置参数调整**：
   - `tcp_tw_reuse` 和 `tcp_tw_recycle` 是 Linux 内核中的两个参数，可以调整 `TIME_WAIT` 状态的处理方式，但不建议在生产环境中随意更改，因为可能引入其他问题。
   - 调整 `MaxIdleConns` 和 `MaxIdleConnsPerHost`，增加连接池的连接数，减少新建连接的频率。

#### **解决方案建议**

1. **调整连接池配置**：
   - 确保 Golang 的客户端和服务端都配置了合理的连接池，避免频繁创建和销毁连接。
   - 例如，客户端可以通过增加 `DefaultMaxIdleConnsPerHost` 或 `MaxIdleConnsPerHost` 参数来保持更多的空闲连接。

   ```go
   client := &http.Client{
       Transport: &http.Transport{
           MaxIdleConns:        100,
           MaxIdleConnsPerHost: 100,
           IdleConnTimeout:     90 * time.Second,
       },
   }
   ```

2. **使用长连接（Keep-Alive）**：
   - 确保 HTTP 请求使用了 `Keep-Alive`，并且服务端正确地支持并配置了 `Keep-Alive`。
   - 如果是 RESTful 服务，尽量减少短连接的使用。

3. **调节服务器的资源配置**：
   - 检查服务器的 `ulimit` 设置，确保文件描述符足够多。
   - 查看并优化服务器的网络配置，例如增大连接追踪表的大小，减少 `TIME_WAIT` 的持续时间。

4. **负载均衡与反向代理**：
   - 如果服务部署在负载均衡器或反向代理之后，确保这些中间件的连接管理配置合理，以减少对后端服务的连接压力。

5. **监控和日志分析**：
   - 通过监控工具和日志分析，确认哪些请求导致了连接的频繁关闭，并针对性地进行优化。

### **最后**

大量的 `TIME_WAIT` 状态通常表明连接管理不当或负载过高。通过合理配置连接池、优化服务器资源配置、并确保 `Keep-Alive` 正确使用，可以显著减少不必要的连接关闭，并降低 `TIME_WAIT` 的积累。持续监控系统表现并进行相应的调整，将有助于保持服务的稳定性和性能。