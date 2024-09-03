HTTP状态码用于指示HTTP请求的处理结果。状态码分为五类，每类有特定的含义：

### 1. **1xx：信息性状态码**

- **100 Continue**：表示初始部分已成功接收，客户端应继续请求或忽略此响应。
- **101 Switching Protocols**：服务器将协议从HTTP切换到另一协议。

### 2. **2xx：成功状态码**

- **200 OK**：请求成功，服务器已返回所请求的数据。
- **201 Created**：请求成功，服务器创建了一个新的资源。
- **202 Accepted**：请求已接受，但尚未处理。
- **203 Non-Authoritative Information**：服务器成功处理了请求，但返回的元信息可能来自另一来源。
- **204 No Content**：服务器成功处理了请求，但没有返回任何内容。
- **205 Reset Content**：服务器成功处理了请求，但要求客户端重置视图。
- **206 Partial Content**：服务器成功处理了部分GET请求。

### 3. **3xx：重定向状态码**

- **300 Multiple Choices**：请求的资源有多个可用的表示，客户端需要选择一个。
- **301 Moved Permanently**：请求的资源已被永久移动到新位置，新的URL在`Location`头部中给出。
- **302 Found**：请求的资源临时移动到新位置，新的URL在`Location`头部中给出。
- **303 See Other**：请求的资源可以在另一个URL处找到，客户端应使用GET方法请求新的URL。
- **304 Not Modified**：资源未被修改，客户端可以使用缓存中的副本。
- **305 Use Proxy**：请求的资源必须通过代理访问，代理的URL在`Location`头部中给出。
- **306 Switch Proxy**：此状态码已废弃。
- **307 Temporary Redirect**：请求的资源临时移动到新位置，客户端应继续使用原方法请求新位置。
- **308 Permanent Redirect**：请求的资源永久移动到新位置，客户端应使用原方法请求新位置。

### 4. **4xx：客户端错误状态码**

- **400 Bad Request**：请求无效或无法理解。
- **401 Unauthorized**：请求未经授权，必须进行身份验证。
- **402 Payment Required**：保留状态码，未来可能会用于要求付款。
- **403 Forbidden**：服务器理解请求，但拒绝处理。
- **404 Not Found**：请求的资源未找到。
- **405 Method Not Allowed**：请求的方法不被允许。
- **406 Not Acceptable**：请求的资源无法满足客户端的Accept头部指定的条件。
- **407 Proxy Authentication Required**：需要通过代理进行身份验证。
- **408 Request Timeout**：请求超时。
- **409 Conflict**：请求与服务器的当前状态冲突。
- **410 Gone**：请求的资源已永久删除，且在服务器上不再可用。
- **411 Length Required**：服务器要求请求中包含Content-Length头部。
- **412 Precondition Failed**：请求的前提条件失败。
- **413 Payload Too Large**：请求的负载过大。
- **414 URI Too Long**：请求的URI过长。
- **415 Unsupported Media Type**：请求的媒体类型不被支持。
- **416 Range Not Satisfiable**：请求的范围无法满足。
- **417 Expectation Failed**：服务器无法满足Expect头部中的期望。

### 5. **5xx：服务器错误状态码**

- **500 Internal Server Error**：服务器遇到意外情况，无法完成请求。
- **501 Not Implemented**：服务器不支持请求的方法。
- **502 Bad Gateway**：服务器作为网关或代理时收到无效响应。
- **503 Service Unavailable**：服务器当前无法处理请求，通常是因为过载或维护。
- **504 Gateway Timeout**：服务器作为网关或代理时，未能及时从上游服务器接收请求。
- **505 HTTP Version Not Supported**：服务器不支持请求中使用的HTTP协议版本。

这些状态码帮助客户端理解服务器对请求的处理结果，并根据需要采取相应的行动。