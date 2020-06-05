const mysql = require("mysql");

const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'koa',
	port: '3306'
})

let query = (sql, params)=>{
	return new Promise((resolve, reject)=>{
		pool.getConnection((err, connection)=>{
			if (err) {
				reject(err)
			} else {
				connection.query(sql, params, (err, rows)=>{
					if(err) {
						reject(err)
					} else{
						resolve(JSON.parse(JSON.stringify(rows)))
					}
					connection.release()
				})
			}
		})
	})

}


module.exports = {
	query
}