const {query} = require("../util/db.js");

const findAllUser = ()=>{
	const sql = "select * from users";
	return query(sql);
}

const findSamePass = ()=>{
	const sql = "select * from users where password = '123'";
	return query(sql);
}

const findUserById = (id)=>{
	const sql = "select * from users where id = ?";
	return query(sql,id);
}

const findUserByNameAndPass = (name,pass)=>{
	const sql = "select * from users where name = ? and password = ?";
	const params = [name,pass];
	return query(sql,params);
}

// 添加(对象方式)
const addUser1 = (obj)=>{
	const sql = "insert into users set ?";
	return query(sql,obj);
}

// 添加(普通方式)
const addUser2 = (id,name,password)=>{
	const sql = "insert into users values(?,?,?)";
	const params = [id,name,password];
	return query(sql,params);
}

// 更新
const updateUser = (id,name)=>{
	const sql = "update users set name = ? where id = ?";
	const params = [name,id];
	return query(sql,params);
}

// 删除
const deleteUser = (id)=>{
	const sql = "delete from users where id = ?";
	return query(sql,id);
}
module.exports = {
	findAllUser,
	findSamePass,
	findUserById,
	findUserByNameAndPass,
	addUser1,
	addUser2,
	updateUser,
	deleteUser
}