### TCP 三次握手（Three-Way Handshake）

TCP 三次握手是建立一个可靠的 TCP 连接的过程，目的是为了确保双方能够正常收发数据，确认彼此的接收能力与发送能力。

**1. 第一次握手（SYN）：**
   - 客户端向服务器发送一个 SYN（Synchronize Sequence Number，同步序列号）报文，表示请求建立连接。
   - SYN 报文中包含一个初始序列号 `Seq`，表示数据传输的序列号起点。

**2. 第二次握手（SYN-ACK）：**
   - 服务器收到 SYN 报文后，回复一个 SYN-ACK 报文，表示同意连接，并同时请求客户端确认连接。
   - SYN-ACK 报文中包含服务器的初始序列号 `Seq` 和对客户端的 ACK（Acknowledgment，确认）序列号 `Ack = 客户端的 Seq + 1`。

**3. 第三次握手（ACK）：**
   - 客户端收到服务器的 SYN-ACK 报文后，向服务器发送一个 ACK 报文，表示确认连接已经建立。
   - ACK 报文中包含 `Ack = 服务器的 Seq + 1`，此时，TCP 连接正式建立，双方可以开始数据传输。

### TCP 四次挥手（Four-Way Handshake）

TCP 四次挥手是终止一个 TCP 连接的过程，确保双方都已完成数据传输并释放资源。

**1. 第一次挥手（FIN）：**
   - 客户端发送一个 FIN（Finish）报文，表示结束数据发送，请求关闭连接。
   - 发送 FIN 的一方不会再发送数据，但可以接收数据。

**2. 第二次挥手（ACK）：**
   - 服务器收到 FIN 报文后，发送一个 ACK 报文，表示确认收到关闭请求。
   - 此时，服务器仍可以继续发送数据。

**3. 第三次挥手（FIN）：**
   - 服务器发送完所有数据后，向客户端发送 FIN 报文，表示数据发送完毕，请求关闭连接。

**4. 第四次挥手（ACK）：**
   - 客户端收到服务器的 FIN 报文后，发送一个 ACK 报文，确认连接关闭。
   - ACK 发送后，客户端等待一段时间（TIME_WAIT 状态）后，正式关闭连接。

### 为什么需要三次握手和四次挥手？

**三次握手的原因：**
   - **双向确认通信双方的发送与接收能力**：三次握手确保双方都已经接收到对方的 SYN 并回复了 ACK，确认连接的建立是可靠的。
   - **防止重复的连接初始化**：三次握手可以避免由于网络延迟导致的旧连接请求影响新连接的建立。

**四次挥手的原因：**
   - **全双工通信的特性**：TCP 是全双工通信，双方都需要单独关闭发送通道。四次挥手允许双方独立地结束各自的数据发送，确保在关闭连接之前，所有的数据都能被完整发送和接收。
   - **保证所有数据都被传输和接收**：四次挥手确保了在关闭连接之前，双方都确认了对方已经不再发送数据，从而避免数据丢失。