const Router = require("koa-router");
const router = new Router();
const {findAllUser,findSamePass,findUserById,
	findUserByNameAndPass,addUser1,
	addUser2,updateUser,
	deleteUser} = require("../server/server.js")

router.get("/allUsers",async(ctx,next)=>{
	let res = await findAllUser();
	//选择在query中处理
    //let list = JSON.parse(JSON.stringify(res)); 
	// console.log(list);
	// ctx.response.type = 'json';
	ctx.body = res;
})

router.get("/id",async(ctx,next)=>{
	let res = await findUserById(3);
	ctx.body = res;
})

router.get("/name",async(ctx,next)=>{
	let res = await findUserByNameAndPass("马化腾","234");
	ctx.body = res;
})

router.get("/addUser1",async(ctx,next)=>{
	let res = await addUser1({id:5,name:"周杰伦",password:"156"});
	ctx.body = {code:0,res: res};
})

router.get("/addUser2",async(ctx,next)=>{
	let res = await addUser2(6,"张无忌","h568868");
	ctx.body = {code:0,res: res};
})

router.get("/updateUser",async(ctx,next)=>{
	let res = await updateUser(6,"赵敏");
	ctx.body = {code:0,res: res};
})

router.get("/deleteUser",async(ctx,next)=>{
	let res = await deleteUser(6);
	ctx.body = {code:0,res: res};
})

// 获取数据的转化方法，但推荐使用JSON.stringify和JSON.parse方法
// router.get("/samePass", async(ctx,next)=>{
// 	let res = await findSamePass();
// 	console.log(res);
// 	let list = [];
// 	for(let i=0;i<res.length;i++) {
// 		let item={};
// 		for(let j in res[i]) {
// 			Object.assign(item,{[j]:res[i][j]});
// 		}
// 		list.push(item);
// 	}
// 	console.log(list);
// 	res.body = list;
// })

module.exports = router;