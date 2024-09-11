HTTP（HyperText Transfer Protocol，超文本传输协议）是应用层的协议，用于在客户端和服务器之间传输数据。HTTP协议的结构包括请求和响应两部分，每部分都有其特定的结构和格式。以下是 HTTP 的基本结构和组成部分。

### HTTP 请求结构

一个 HTTP 请求由以下部分组成：

1. **请求行（Request Line）**
   - **方法（Method）**：请求的类型，例如 `GET`, `POST`, `PUT`, `DELETE` 等。
   - **请求目标（Request-URI）**：请求的资源地址或路径。
   - **协议版本（Protocol Version）**：HTTP 协议的版本，例如 `HTTP/1.1`。

   **示例**：
   ```
   GET /index.html HTTP/1.1
   ```

2. **请求头部（Request Headers）**
   - 包含了请求的附加信息，如客户端的浏览器类型、接受的响应内容类型、语言设置等。每个头部字段由字段名和字段值组成，字段名和值之间用冒号分隔。

   **示例**：
   ```
   Host: www.example.com
   User-Agent: Mozilla/5.0
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
   ```

3. **空行**
   - 请求头部和请求体之间有一个空行（即 CRLF，即回车换行符）。

4. **请求体（Request Body， 可选）**
   - 包含了请求的数据，通常在 `POST` 和 `PUT` 方法中使用。对于 `GET` 请求，请求体通常为空。

   **示例**：
   ```
   name=John&age=30
   ```

### HTTP 响应结构

一个 HTTP 响应由以下部分组成：

1. **响应行（Response Line）**
   - **协议版本（Protocol Version）**：HTTP 协议的版本，例如 `HTTP/1.1`。
   - **状态码（Status Code）**：表示响应的状态，例如 `200`（成功）、`404`（未找到）、`500`（服务器错误）。
   - **状态描述（Status Message）**：状态码的文本描述，例如 `OK`, `Not Found`, `Internal Server Error`。

   **示例**：
   ```
   HTTP/1.1 200 OK
   ```

2. **响应头部（Response Headers）**
   - 包含了响应的附加信息，如服务器信息、内容类型、内容长度等。每个头部字段由字段名和字段值组成，字段名和值之间用冒号分隔。

   **示例**：
   ```
   Content-Type: text/html
   Content-Length: 1234
   Server: Apache/2.4.1 (Unix)
   ```

3. **空行**
   - 响应头部和响应体之间有一个空行（即 CRLF）。

4. **响应体（Response Body， 可选）**
   - 包含了实际的响应内容，如 HTML 文件、JSON 数据、图像等。响应体的内容类型由 `Content-Type` 头部指定。

   **示例**：
   ```html
   <html>
   <body>
       <h1>Hello, world!</h1>
   </body>
   </html>
   ```

### 总结

- **HTTP 请求**：由请求行、请求头部、空行和请求体组成。
- **HTTP 响应**：由响应行、响应头部、空行和响应体组成。

每部分的具体格式和内容可以根据 HTTP 协议版本和具体应用场景有所不同，但以上是 HTTP 请求和响应的基本结构。