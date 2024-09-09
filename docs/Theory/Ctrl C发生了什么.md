`Ctrl + C` 是一个在计算机终端或控制台中广泛使用的键盘快捷键，它的主要作用是中断当前正在运行的程序或命令。具体来说，按下 `Ctrl + C` 会向终端或控制台中的进程发送一个中断信号。这个操作的细节如下：

### 作用

1. **发送中断信号**：
   - `Ctrl + C` 发送一个 `SIGINT`（Signal Interrupt）信号给当前的前台进程。`SIGINT` 信号的默认行为是中断进程，即停止当前的操作并终止程序的执行。

2. **终止程序**：
   - 当程序收到 `SIGINT` 信号后，它通常会被终止。程序可以通过捕获 `SIGINT` 信号并注册自定义处理函数来执行清理操作或其他自定义行为，而不是直接退出。

### 实现细节

- **在 Unix/Linux 系统中**：
  - `Ctrl + C` 发送 `SIGINT` 信号到进程组中的所有前台进程。
  - 默认情况下，`SIGINT` 信号会终止正在运行的进程，但程序可以通过设置信号处理程序来改变这一行为。例如，程序可以捕获 `SIGINT` 信号并在接收到信号时执行某些特定操作，而不是直接退出。

- **在 Windows 系统中**：
  - `Ctrl + C` 的作用类似，发送中断信号到当前前台进程，通常会中止进程的执行。
  - Windows 命令行窗口的处理机制与 Unix/Linux 系统类似，但具体的实现细节可能会有所不同。

### 示例

在一个 Unix/Linux 系统的终端中，如果你正在运行一个长时间执行的程序（如 `ping` 命令），按下 `Ctrl + C` 会中断 `ping` 命令的执行，并返回终端提示符。例如：

```bash
$ ping google.com
PING google.com (142.250.196.174) 56(84) bytes of data.
64 bytes from 142.250.196.174: icmp_seq=1 ttl=117 time=12.1 ms
64 bytes from 142.250.196.174: icmp_seq=2 ttl=117 time=11.7 ms
^C
--- google.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
```

在这个例子中，`^C` 表示 `Ctrl + C` 被按下，`ping` 命令被中断。

### 总结

`Ctrl + C` 是一个常用的快捷键，用于中断当前的命令或程序。它通过发送 `SIGINT` 信号来实现这一功能，允许用户在命令行界面中中止正在运行的任务。