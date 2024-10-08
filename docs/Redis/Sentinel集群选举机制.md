**Redis Sentinel** 是 Redis 高可用架构的关键组件，用于监控 Redis 主从结构、自动故障转移以及通知系统管理员。当 Redis 的主节点出现故障时，Sentinel 可以自动将从节点提升为新的主节点，确保系统的可用性。

### 概要
Redis Sentinel 集群选举机制主要包括定时任务、主观下线、客观下线、Sentinel 领导者选举和故障转移五个部分。

### 一、三个定时任务

1. **每隔10秒**：
   - **Sentinel 向所有已知的主节点、从节点以及其他 Sentinel 发送 `INFO` 命令**：
     - 获取节点的最新状态信息，包括复制信息、拓扑结构等。
     - 更新自身对整个集群的了解，发现新的从节点或 Sentinel 实例。

2. **每隔2秒**：
   - **Sentinel 向所有主节点和从节点发送 `PING` 命令**：
     - 测试这些节点的可用性。若节点在规定时间内没有响应 `PING`，Sentinel 认为该节点存在问题，并可能标记为“主观下线”。

3. **每隔1秒**：
   - **Sentinel 之间相互发送 `PING` 命令**：
     - 确保各个 Sentinel 实例之间的连接和通信正常。
     - 如果 Sentinel 之间的连接出现问题，可能会导致“主观下线”。

### 二、主观下线

主观下线是 Sentinel 根据自身判断认为某个节点出现了故障。具体步骤如下：

- 当 Sentinel 无法收到某个 Redis 节点的 `PING` 命令响应时，它会将该节点标记为主观下线。
- 仅由一个 Sentinel 实例判断，无需其他 Sentinel 的一致同意。

### 三、客观下线

客观下线是在多个 Sentinel 对同一节点判定为主观下线后，共同认定该节点确实出现故障的过程：

- 多个 Sentinel 通过交换信息确认该节点已经长时间无响应，且超过设定的下线阈值。
- 当超过配置的 `quorum`（法定人数）时，该节点会被标记为客观下线。

### 四、Sentinel领导者选举

当主节点被判定为客观下线时，需要从从节点中选择一个新的主节点，并且整个故障转移过程需要一个 Sentinel 领导者来协调：

- **选举流程**：
  1. 所有 Sentinel 实例会进行一次投票，每个 Sentinel 可以投票给自己或者其他 Sentinel。
  2. 若某个 Sentinel 获得的票数超过法定人数 `quorum`，则它被选为领导者，负责执行故障转移。
  
- **投票机制**：
  - Sentinel 使用 Raft 算法中的部分思想来实现选举一致性。每个投票周期，每个 Sentinel 只能投一票。
  - 如果在超时时间内未能选出领导者，则重新开始选举，直到成功选出领导者。

### 五、故障转移

故障转移是整个 Sentinel 系统的核心任务：

1. **停止旧主节点的服务**：
   - Sentinel 领导者尝试通过配置将旧的主节点从集群中剔除。
   
2. **选择新的主节点**：
   - 从所有可用的从节点中选择一个条件最优的节点作为新的主节点。
   - 条件包括：复制偏移量（优先选择数据最完整的节点）、从节点的优先级（`slave-priority`）等。

3. **将其他从节点指向新的主节点**：
   - 领导者 Sentinel 会将其他从节点重新配置为新的主节点的从节点。

4. **更新配置**：
   - Sentinel 领导者通知所有 Sentinel 更新它们的配置，指向新的主节点。

5. **通知客户端**：
   - 如果配置了通知脚本，Sentinel 会通知客户端新的主节点信息。

通过这五个步骤，Redis Sentinel 实现了对主节点故障的自动恢复和集群高可用性的保障。