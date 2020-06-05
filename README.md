### koa

##### Koa -- 基于Node.js平台的下一代web开发框架

## [Documentation Studying](https://chenshenhai.github.io/koa2-note/)


## using

1. router
```router
    const Koa = require("koa");
    const app = new Koa();
    const Router = require("koa-router");
    const router = new Router();
    router.get("/home", async(ctx,next)=>{ ctx.body = "hello router" })  // 前面前置url可不加 ( router.prefix("/home") )
    app.use("/main", router.routes(),router.allowedMethods());
```

2. cookies
```cookies
    app.use(async (ctx,next)=> {
    	const n = Number(ctx.cookies.get("view") || 0) + 1;
        ctx.cookies.set("view", n);
        ctx.cookies.set("name", "min", {
            domain: 'localhost',              // 写cookie所在的域名
            path: '/index',                   // 写cookie所在的路径
            maxAge: 10 * 60 * 1000,           // cookie有效时长
            expires: new Date('2019-04-29'),  // cookie失效时间
            httpOnly: false,                  // 是否只用于http请求中获取,阻止document脚本访问
            overwrite: false                  // 是否允许重写
        })
        ctx.response.body = "view : "+ n;
        await next()
    })
```

3. cross (或者使用koa2-cors)
```cross
    app.use(async(ctx,next)=>{
    	ctx.set('Access-Control-Allow-Origin', '*');
    	// ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); 
        ctx.set('Access-Control-Allow-Headers', 'content-type');
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH');
        ctx.set('Access-Control-Allow-Credentials', true);   //允许跨域发送cookie
        await next();
    })
    
```


4. jsonp
- 手动实现
```jsonp
    app.use(async(ctx,next)=>{
        if(ctx.method === "GET" && ctx.url.split("?")[0]=== '/getData.jsonp') {
             // 获取jsonp的callback
            let callbackName = ctx.query.callback || 'callback';
            let data = {
                name: 'hejiamin',
                age: 23
            };
            const jsonpStr = `${callbackName}(${JSON.stringify(data)})`;
            // 用text/javascript，让请求支持跨域获取
            ctx.type = 'text/javascript'
    
            // 输出jsonp字符串
            ctx.body = jsonpStr;
        } else {
            ctx.body = "hello jsonp";
        }
        await next();
    })
```
- koa-jsonp
```jsonp
    const jsonp = require("koa-jsonp");
    app.use(jsonp());
    app.use(async(ctx,next)=>{
    	if(ctx.url === "/person") {
    		let data = {
                name: 'hejiamin',
                age: 22
            };
    		ctx.body = data;
    	} else {
    		ctx.body = "hello jsonp middleware";
    	}
    })
```


5. static 静态服务
```static
    const serve = require("koa-static");
    const path = require("path");
    
    //设置静态服务
    app.use(serve(path.resolve(__dirname,"./public")));
```

6. session
```session
    const Koa = require('koa')
    const session = require('koa-session-minimal')
    const MysqlSession = require('koa-mysql-session')
    
    const app = new Koa();
    
    // 配置存储session信息的mysql
    let store = new MysqlSession({
      user: 'root',
      password: '123456',
      database: 'koa',
      host: '127.0.0.1'
    })
    
    // 存放sessionId的cookie配置
    let cookie = {
      maxAge: '', // cookie有效时长
      expires: '',  // cookie失效时间
      path: '', // 写cookie所在的路径
      domain: '', // 写cookie所在的域名
      httpOnly: '', // 是否只用于http请求中获取
      overwrite: '',  // 是否允许重写
      secure: '',
      sameSite: '',
      signed: '',
    }
    
    // 使用session中间件
    app.use(session({
      key: 'SESSION_ID',
      store: store,
      cookie: cookie   //cookie存在默认值，可以不配置
    }))
    
    app.use(async (ctx) => {
    
      // 设置session
      if ( ctx.url === '/set' ) {
        ctx.session = {
          user_id: Math.random().toString(36).substr(2),
          count: 0
        }
        ctx.body = ctx.session
      } else if ( ctx.url === '/' ) {
    
        // 读取session信息
        ctx.session.count = ctx.session.count + 1
        ctx.body = ctx.session
      } 
    
    })

```





