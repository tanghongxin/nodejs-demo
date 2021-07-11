# 🎉 ts-decorator-demo

A simple MVC server based on nodejs and decorator written in pure typescript.

Make it a little bit more convenient to build a tiny backend.




It's recommended be considered as a practice for Design Pattern and MVC-LIKE framework.

## 📝 Usage
```bash
git clone https://github.com/tanghongxin/ts-decorator-demo.git
cd ts-decorator-demo
npm i
npm run dev
```

```bash
# login
curl --location --request POST 'http://127.0.0.1:8000/auth/token'

# logout
curl --location --request DELETE 'http://127.0.0.1:8000/auth/token'

# index.html
curl --location --request GET 'http://127.0.0.1:8000/index.html'

# 404
curl --location --request GET 'http://127.0.0.1:8000/xxx'
```

## ✨ Features
- Controller
- Get
- Post
- Put
- Delete
- Enhanced Request and Response for nodejs http
- Static server
- Simple Router


## 🚧 TODO
- Service
- Autowired
- Params
- Middleware
