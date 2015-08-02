var mysql = require('./mysql');

function login_request(msg, callback){	
	try{
		var res = {};
		var password = replaceUnwantedCharacters(msg.password);
		var username = replaceUnwantedCharacters(msg.username);
		var query = "SELECT UserId from users where Username='" + username + "' AND Password='" + password + "';";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,results){
			try{
				if (!err){
					  if(results.length > 0){
						  if(results[0].UserId > 0){
							  console.log("sign in successful");
							  var newId = guid();
							  var query = "INSERT INTO session(SessionId, UserId, LastCommunicationTime)";
								query += " VALUES('" + newId + "', " + results[0].UserId + ", NOW())";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,result){
									try{
										if (!err){
											  console.log("session added successfully");
											  res.code = "200";
											  res.value = {"result":results, "error": false, "message": "", "GUID": newId};
											  callback(null, res);
										  }
										  else{
											  console.log("error while fetching user profile details.");
											  res.code = "500";
											  res.value = {"result":"", "error": true, "message": err.message};		
											  callback(null, res);
										  }
									} catch(err){
										res.code = "500";
										res.value = {"result":"", "error": true, "message": err.message};
										callback(null, res);
									}  
								},query);							  
						  }	
						  else{
							  console.log("signin failed");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No records found."};	
							  callback(null, res);
						  }					  
					  }
					  else{
						  console.log("signin failed");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No records found."};		
						  callback(null, res);
					  }	
				  }
				  else{
					  console.log("signin failed");
					  res.code = "500";
					  res.value = {"result":"", "error": true, "message": err.message};	
					  callback(null, res);
				  }
			} catch(err){
				res.code = "500";
				res.value = {"result":"", "error": true, "message": err.message};
				callback(null, res);
			}  
		},query);
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": "An error occured while signin."};
		callback(null, res);
	}
}


function logout_request(msg, callback){
	try{
		var res = {};
		var userid = parseInt(msg.userid);
		var token = msg.token;
		var query = "DELETE FROM session WHERE SessionId = '" + token + "' AND UserId = " + userid + ";";
		console.log("Query is:"+query);
		  mysql.fetchData(function(err,results){
				try{
					if (!err){
						  console.log("session deleted successfully.");		
						  res.code = "200";
						  res.value = {"result":"LastLogin updated successfully.", "error": false, "message": ""};
						  callback(null, res);
					  }
					  else{
						  console.log("Failed in updating last login.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": err.message};
						  callback(null, res);
					  }
				} catch(err){
					res.code = "500";
					res.value = {"result":"", "error": true, "message": err.message};
					callback(null, res);
				}  
			},query);
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": ex.message};
		callback(null, res);
	}	
}


function signup_request(msg, callback){
	try{
		var res = {};
		var firstname = msg.firstname;
		var lastname = msg.lastname;
		var password = msg.password;
		var emailId = msg.emailId;
		var salt = parseInt(Math.random() * 10000000000);
		var date = msg.date;
		var query = "SELECT UserId FROM users WHERE username = '"+emailId+"'";	
		console.log("Query is:"+query);
		mysql.fetchData(function(err,results){
			try{
				if (!err){	
					 if(results.length > 0){
						  if(results[0].UserId > 0){					
							  res.code = "400";
							  res.value = {"result":"", "error": true, "message": "This email id is already in use."};
							  callback(null, res);
						  }
					 }
					 else{
						 var query = "INSERT INTO users (Username, Password, PasswordSalt, Salt, LastLogin)";
							query = query + "VALUES('" + emailId + "', '" + password + "', '" + password + salt + "', '" + salt + "', NOW());";	
							console.log("Query is:"+query);
							mysql.fetchData(function(err,results){
								try{
									if (!err){						
										  console.log("sign up successful");
										  var query = "SELECT UserId FROM users WHERE username = '"+emailId+"'";	
											console.log("Query is:"+query);
											mysql.fetchData(function(err,resu){
												try{
													if (!err){						
														  console.log("values added to user profile.");									  
														  var query = "INSERT INTO userprofile (UserId, FirstName, LastName)";
															query = query + "VALUES("+resu[0].UserId+", '" + firstname + "', '" + lastname + "');";	
															console.log("Query is:"+query);
															mysql.fetchData(function(err,results){
																try{
																	if (!err){						
																		  console.log("values added to user profile.");	
																		  res.code = "200";
																		  res.value = {"result":"signup successful", "error": false, "message": ""};
																		  callback(null, res);
																	  }
																	  else{
																		  console.log("signup failed");
																		  res.code = "500";
																		  res.value = {"result":"", "error": true, "message": err.message};
																		  callback(null, res);
																	  }
																} catch(err){
																	res.code = "500";
																	res.value = {"result":"", "error": true, "message": err.message};
																	callback(null, res);
																}  
															},query);
													  }
													  else{
														  console.log("signup failed");
														  res.code = "500";
														  res.value = {"result":"", "error": true, "message": err.message};		
														  callback(null, res);
													  }
												} catch(err){
													res.code = "500";
													res.value = {"result":"", "error": true, "message": err.message};
													callback(null, res);
												}  
											},query);
									  }
									  else{
										  console.log("signup failed");
										  res.code = "500";
										  res.value = {"result":"", "error": true, "message": err.message};		
										  callback(null, res);
									  }
								} catch(err){
									res.code = "500";
									res.value = {"result":"", "error": true, "message": err.message};
									callback(null, res);
								}  
							},query);	
					 }
				  }
				  else{
					  console.log("signup failed");
					  res.code = "500";
					  res.value = {"result":"", "error": true, "message": err.message};		
					  callback(null, res);
				  }
			} catch(err){
				res.code = "500";
				res.value = {"result":"", "error": true, "message": err.message};
				callback(null, res);
			}  
		},query);
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": ex.message};
		callback(null, res);
	}
}

function updatelastlogin_request(msg, callback){
	try{
		var res = {};
		var userid = msg.userid;
		var token = msg.token;
		var query = "UPDATE users SET LastLogin = NOW() WHERE UserId = " + userid + ";";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,results){
			try{
				if (!err){
					  console.log("LastLogin updated successfully.");	
					  res.code = "200";
					  res.value = {"result":"LastLogin updated successfully.", "error": false, "message": ""};
					  callback(null, res);
				  }
				  else{
					  console.log("Failed in updating last login.");
					  res.code = "500";
					  res.value = {"result":"", "error": true, "message": err.message};			
					  callback(null, res);
				  }
			} catch(err){
				res.code = "500";
				res.value = {"result":"", "error": true, "message": err.message};
				callback(null, res);
			}  
		},query);
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": ex.message};
		callback(null, res);
	}
}

function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}

function replaceUnwantedCharacters(n) {
		var parameter = n;
		var desired = parameter.replace(/<script>/gi, "");
		desired = desired.replace(/\/script>/gi, "");
		return desired
	}

exports.login_request = login_request;
exports.logout_request = logout_request;
exports.signup_request = signup_request;
exports.updatelastlogin_request = updatelastlogin_request;