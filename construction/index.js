// 例子使用模板和重定向
const Koa = require("koa");
const fs = require("fs");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(async (ctx,next)=>{
	console.log(ctx.request.path);
	console.log(ctx.request.url);
    await next();
})
// 打日志中间件
const logger = async (ctx, next)=> {
	console.log(`${Date.now()}`);
	await next();
}
app.use(logger);
app.use(bodyParser());

router.get("/",async (ctx,next)=>{
	ctx.response.body = "<h1>hello /</h1>";
})
router.get("/index",async (ctx,next)=>{
    ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream("./index.html");
})
router.get("/name",async(ctx,next)=> {
	ctx.response.redirect("/");
})

app.use(router.routes(),router.allowedMethods());

app.listen(3002,async ()=>{
    console.log("server已在3002端口启动");
})