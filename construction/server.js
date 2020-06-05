const Application=require("./application.js");

const app=new Application();
app.use((req,res)=>{
	res.writeHead(200);
	res.end('hello min');
});

app.listen(3000,()=>{
	console.log('服务已经在3000口启动');
});