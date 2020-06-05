const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const userRouter = require('./router/user.js');

app.use(async(ctx,next)=>{
	ctx.body = "hello mysql";
	ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());


app.listen(3000, async()=>{
	console.log("服务器已经在3000端口启动")
});