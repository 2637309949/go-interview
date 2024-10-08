以下是 HTTPS 工作原理的 Markdown 风格图解：

---

## **HTTPS 工作流程**

### **1. 初始请求**
- **客户端（浏览器） → 服务器：**
  - 客户端向服务器发送请求，要求建立 HTTPS 连接（如 `https://example.com`）。
  - 服务器返回其 SSL/TLS 证书。

### **2. SSL/TLS 握手**
- **证书交换：**
  - 服务器将其 SSL/TLS 证书发送给客户端，证书中包含服务器的公钥。

```
┌───────────────┐
│   浏览器请求  │
│  https://example.com  │
└───────────────┘
         │
         ▼
┌───────────────┐
│   服务器返回   │
│  SSL/TLS 证书  │
└───────────────┘
```

### **3. 证书验证**
- **客户端验证：**
  - 客户端验证服务器的证书是否有效（包括检查证书颁发机构是否可信，证书是否过期等）。
  - 如果验证通过，客户端生成一个随机对称密钥，并用服务器的公钥加密。

```
┌───────────────┐
│  客户端验证   │
│  服务器证书   │
└───────────────┘
         │
         ▼
┌───────────────┐
│  生成对称密钥 │
│ 并用公钥加密  │
└───────────────┘
```

### **4. 对称密钥交换**
- **客户端 → 服务器：**
  - 客户端将加密后的对称密钥发送给服务器。
  - 服务器用自己的私钥解密对称密钥。
  
```
┌───────────────┐
│  加密的对称密钥│
│  发送给服务器  │
└───────────────┘
         │
         ▼
┌───────────────┐
│  服务器用私钥解密│
│  获得对称密钥  │
└───────────────┘
```

### **5. 安全通信**
- **加密通信：**
  - 客户端和服务器使用对称加密进行数据通信，此时通信是加密的，确保数据安全。

```
┌───────────────┐
│   加密数据传输 │
│  使用对称密钥 │
└───────────────┘
         │
         ▼
┌───────────────┐
│   服务器接收   │
│   并解密数据   │
└───────────────┘
```

### **6. 终止连接**
- **断开连接：**
  - 当通信结束时，客户端和服务器可以终止 SSL/TLS 连接。

```
┌───────────────┐
│  终止 SSL/TLS │
│  安全连接    │
└───────────────┘
```

---

这个流程说明了 HTTPS 如何通过 SSL/TLS 协议确保客户端与服务器之间的通信是加密的，防止数据被窃取或篡改。