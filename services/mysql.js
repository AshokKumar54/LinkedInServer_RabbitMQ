var mysql = require('mysql');
var poolStack = [];
var maxSizeOfPool = 200; 
var myVar = 0;

for(var i = 0; i < maxSizeOfPool; i++){
	var conn = getConnection();
	poolStack.push(conn);
}

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
	    user     : 'sauser',
	    password : 'sa@1234',
	    database : 'linkedin_rabbitmq'
	});
	return connection;
}

function getConnectionFromPool(){
	var conn = poolStack.pop();
	return conn;
}

function releaseConnection(conn){
	poolStack.push(conn);
}

function fetchData(callback,sqlQuery){	
	console.log("\nSQL Query::"+sqlQuery);	
	var connection = getConnectionFromPool();	
	conn.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			releaseConnection(connection);
			callback(err, rows);
		}
	});	
}	

exports.fetchData=fetchData;