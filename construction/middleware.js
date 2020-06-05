function add(x,y){
	return x+y;
}
function double(z){
	return 2*z;
}

//最普通使用
// const res3=double(add(1,2));
// console.log(res3);

//根据middleware数量来执行
const middlewares=[add,double];
function compose(middlewares){
	return (...args)=>{
		let res=middlewares[0](...args)
		for(let i=1;i<middlewares.length;i++){
			res = middlewares[i](res);
		}  
		return res;   
	}
}
const fn = compose(middlewares);
const res = fn(1,2);
console.log(res);

