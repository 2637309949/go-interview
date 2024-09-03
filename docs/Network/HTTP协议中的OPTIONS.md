HTTP协议中的`OPTIONS`方法用于查询服务器支持的通信选项。它可以用于确认服务器允许哪些HTTP方法、支持哪些特性（如CORS、认证方式等），以及用于特定资源或整个服务器的配置。

### 主要用途

1. **跨域资源共享（CORS）预检请求**：
   - 在浏览器中，当前端发起跨域请求且使用了非简单HTTP方法（如`PUT`、`DELETE`、`PATCH`）或带有自定义请求头时，浏览器会首先发送一个`OPTIONS`请求，称为“预检请求”（Preflight Request）。通过这个预检请求，浏览器可以询问服务器是否允许该跨域请求，并确认实际请求是否安全。
   - 服务器通过响应`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`等HTTP头来告知浏览器允许的请求方法和头信息。

2. **探测服务器支持的HTTP方法**：
   - 客户端可以发送`OPTIONS`请求来检测服务器支持哪些HTTP方法（如`GET`、`POST`、`PUT`等），从而避免发送不支持的方法导致的错误响应。
   - 服务器会通过响应头`Allow`返回支持的HTTP方法列表。

3. **服务器或资源的能力探测**：
   - `OPTIONS`方法可以用来查询服务器整体或特定资源的能力配置，比如允许的内容类型、是否支持身份验证等。

### 示例

**请求：**
```http
OPTIONS /resource HTTP/1.1
Host: example.com
```

**响应：**
```http
HTTP/1.1 204 No Content
Allow: GET, POST, OPTIONS
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

- **Allow**：列出了服务器支持的HTTP方法。
- **Access-Control-Allow-Methods**：列出了允许的跨域HTTP方法。
- **Access-Control-Allow-Headers**：列出了允许的自定义请求头。

### 总结
`OPTIONS`方法主要用于客户端在执行请求前探测服务器支持的能力或设置。它是实现跨域请求处理的重要部分，尤其在现代Web应用中非常常见。