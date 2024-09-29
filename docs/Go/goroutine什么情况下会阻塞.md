在 Go 中，`goroutine` 会在以下几种情况下发生阻塞：

### 1. **等待 I/O 操作**
   当一个 `goroutine` 发起 I/O 操作（例如读取文件、网络请求、数据库查询等）时，除非是异步操作，`goroutine` 会被阻塞直到 I/O 操作完成。例如，读取文件或网络时，`goroutine` 可能会阻塞直到读取完成。

   ```go
   // 例子：网络请求导致 goroutine 阻塞
   response, err := http.Get("https://example.com")
   if err != nil {
       log.Fatal(err)
   }
   defer response.Body.Close()
   ```

### 2. **等待 Channel 的操作**
   `goroutine` 可能会在与 `channel` 的通信过程中被阻塞，具体表现为：
   - **发送数据到未缓冲的 channel**：发送方会阻塞直到有接收方接收数据。
   - **从未缓冲的 channel 接收数据**：接收方会阻塞直到有发送方发送数据。
   - **缓冲的 channel**：如果缓冲区满，发送方会阻塞；如果缓冲区为空，接收方会阻塞。

   ```go
   // 例子：从 channel 接收数据阻塞
   ch := make(chan int)
   go func() {
       ch <- 42 // 阻塞，直到有接收方
   }()

   data := <-ch // 阻塞，直到有发送方发送数据
   ```

### 3. **锁（Mutex）竞争**
   在多 `goroutine` 的情况下，如果一个 `goroutine` 需要访问某些共享资源，而该资源已经被其它 `goroutine` 锁定，那么当前 `goroutine` 就会阻塞，直到锁被释放。

   ```go
   var mu sync.Mutex
   mu.Lock()    // 获得锁，进入临界区
   // 如果其他 goroutine 调用 mu.Lock()，它们会阻塞直到锁被释放
   mu.Unlock()  // 释放锁
   ```

### 4. **等待条件变量（Cond）**
   `sync.Cond` 是一种用于 `goroutine` 通知的机制，通常用于协调 `goroutine` 的状态变化。使用 `Cond.Wait()` 的 `goroutine` 会阻塞，直到收到 `Cond.Signal()` 或 `Cond.Broadcast()` 通知。

   ```go
   var mu sync.Mutex
   cond := sync.NewCond(&mu)

   go func() {
       cond.L.Lock()
       cond.Wait() // 阻塞，直到收到通知
       cond.L.Unlock()
   }()

   cond.L.Lock()
   cond.Signal() // 通知一个阻塞的 goroutine
   cond.L.Unlock()
   ```

### 5. **`select` 语句中所有分支都被阻塞**
   如果 `select` 语句中的所有 `channel` 操作都被阻塞，那么 `goroutine` 也会阻塞，直到其中一个 `channel` 能继续操作。

   ```go
   select {
   case msg := <-ch1: // 如果 ch1 没有数据，阻塞
       fmt.Println(msg)
   case msg := <-ch2: // 如果 ch2 没有数据，阻塞
       fmt.Println(msg)
   }
   ```

### 6. **`time.Sleep()` 或者 `time.After()`**
   `goroutine` 会在调用 `time.Sleep()` 期间阻塞，直到指定的时间过期。

   ```go
   time.Sleep(2 * time.Second) // 阻塞 2 秒
   ```

### 7. **等待系统调用（syscall）或外部依赖**
   当 `goroutine` 发起系统调用，或者通过 `CGO` 调用外部库时，也可能会发生阻塞。系统调用或外部库的操作完成后，`goroutine` 才能恢复执行。

### 8. **主 `goroutine` 阻塞导致其他 `goroutine` 终止**
   如果主 `goroutine`（即 `main` 函数）阻塞或退出，所有其他 `goroutine` 会被终止。所以，在 `main` 函数中，也可能需要防止主 `goroutine` 提前结束而导致阻塞。

   ```go
   go func() {
       fmt.Println("This will not print if main exits early")
   }()
   
   time.Sleep(1 * time.Second) // 防止 main 退出过早
   ```

### 总结
在 Go 中，`goroutine` 可能会因为 I/O 操作、channel 操作、锁竞争、条件变量等待、`select` 语句的阻塞、系统调用等原因被阻塞。因此在设计并发程序时，需要仔细考虑如何避免不必要的阻塞，以提高程序的并发性能。