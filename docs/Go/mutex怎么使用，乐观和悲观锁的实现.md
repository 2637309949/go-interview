### Golang 中 `sync.Mutex` 的使用

`sync.Mutex` 是 Go 中用来提供互斥锁（Mutual Exclusion）的结构体，它可以确保在同一时刻只有一个 Goroutine 访问共享资源。

#### `sync.Mutex` 的基本用法：
```go
package main

import (
    "fmt"
    "sync"
)

var (
    counter int
    mu      sync.Mutex
)

func increment(wg *sync.WaitGroup) {
    mu.Lock()   // 加锁
    counter++
    mu.Unlock() // 解锁
    wg.Done()
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go increment(&wg)
    }

    wg.Wait()
    fmt.Println("Final Counter:", counter)
}
```
### 使用步骤：
1. **加锁**：通过 `mu.Lock()` 加锁，在访问共享资源前调用，确保其他 Goroutine 无法同时访问资源。
2. **解锁**：通过 `mu.Unlock()` 解锁，确保在完成操作后释放锁，让其他 Goroutine 可以访问。

### 乐观锁与悲观锁

#### 1. **悲观锁**
悲观锁是一种假设冲突将频繁发生的锁定机制。在进行数据操作前，通过加锁来确保不发生冲突，其他操作必须等待锁释放后才能继续。

##### Go 中的悲观锁实现：
悲观锁的实现通常直接通过 `sync.Mutex` 或 `sync.RWMutex` 来完成。它假设并发冲突会发生，因此每次访问资源时都会加锁。

**使用场景**：
- 数据竞争严重或并发冲突频繁的场景。
- 例如银行系统的资金转账、数据库写操作等，需要保证绝对一致性。

```go
mu.Lock()
// 操作临界资源
mu.Unlock()
```

#### 2. **乐观锁**
乐观锁则假设冲突不会经常发生，在执行操作时不会立即加锁。只有在提交或修改数据时，才会检查是否有其他 Goroutine 修改了数据。如果有冲突，就回滚操作并重试。

##### Go 中的乐观锁实现：
乐观锁通常通过比较和交换（CAS, Compare And Swap）的机制来实现，例如使用 `sync/atomic` 包。

**使用场景**：
- 并发冲突较少或数据读取操作多，写入操作少的场景。
- 例如大规模的分布式系统，读多写少的情况（如缓存系统）。

```go
package main

import (
    "fmt"
    "sync/atomic"
)

var counter int64

func increment() {
    for {
        old := atomic.LoadInt64(&counter)
        new := old + 1
        if atomic.CompareAndSwapInt64(&counter, old, new) {
            break
        }
    }
}

func main() {
    for i := 0; i < 1000; i++ {
        go increment()
    }
    fmt.Println("Final Counter:", counter)
}
```

### 乐观锁与悲观锁的使用场景对比：
- **悲观锁**：适用于写多、并发冲突严重的场景。常用于数据库系统中，对写操作的加锁控制。
- **乐观锁**：适用于读多写少、并发冲突较少的场景。分布式系统、缓存系统等场景经常用乐观锁。