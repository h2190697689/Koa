async function f1(next){
	console.log('fn1');
	await next();
	console.log('end fn1');
}

async function f2(next){
	console.log('fn2');
	await delay();
	await next();
	console.log('end fn2');
}

async function f3(){
	console.log('fn3');
}


function delay(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve();
		},2000)
	})
}

function compose(middlewares){
	return function(){
		return dispatch(0);
		function dispatch(i){
			let fn=middlewares[i];
			if(!fn){
				return Promise. resolve();
			}
			return Promise.resolve(fn(function next(){
				return dispatch(i+1);
			}))
		}
	}
}