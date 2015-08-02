var mysql = require('./mysql');

function addUserConnection_request(msg, callback){
	try{
		var res = {};
		var otheruserId = parseInt(msg.otheruserid);
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO connections (UserId, OtherUserId, IsInvitation)";
								query = query + "VALUES(" + userId + ", " + otheruserId + ", 1);";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("connection added successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			  res.code = "200";
														  res.value = {"result":"Connection added successfully.", "error": false, "message": ""};		
														  callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Add connection failed.");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);					  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);					  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function showAddedConnection_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT FirstName, Lastname, ShortDetail, user.UserId, City, State FROM userprofile user ";
							  query += "INNER JOIN connections conn on conn.OtherUserId = user.UserId WHERE conn.IsInvitation = 0 AND conn.UserId = "+userId+";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function showInvitedConnection_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT FirstName, Lastname, ShortDetail, user.UserId, City, State FROM userprofile user ";
							  query += "INNER JOIN connections conn on conn.OtherUserId = user.UserId WHERE conn.IsInvitation = 1 AND conn.UserId = "+userId+";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function showInvitation_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT FirstName, Lastname, ShortDetail, user.UserId, City, State FROM userprofile user ";
							  query += "INNER JOIN connections conn on conn.UserId = user.UserId WHERE conn.IsInvitation = 1 AND conn.OtherUserId = "+userId+";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function showConnectionforDelete_request(msg, callback){
	try{
		var res = {};
		var userid = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT FirstName, Lastname, ShortDetail, conn.Id, City, State FROM userprofile user";
								query += " INNER JOIN connections conn on user.UserId = conn.OtherUserId WHERE conn.UserId = " + userid + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function deleteConnection_request(msg, callback){
	try{
		var res = {};
		var id = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "DELETE FROM connections WHERE Id = " + id + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Connection deleted succefully");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Connection deleted succefully.", "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed to delete the connection");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function acceptInvitation_request(msg, callback){
	try{
		var res = {};
		var otheruserId = parseInt(msg.otheruserid);
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO connections (UserId, OtherUserId, IsInvitation)";
								query = query + "VALUES(" + userId + ", " + otheruserId + ", 0);";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("connection accepted successfully.");
											  //update connection isinvitation flag to 0
											  var query = "UPDATE connections SET IsInvitation = 0 WHERE UserId = "+otheruserId+" AND OtherUserId = "+userId+";";
												console.log("Query is:"+query);
												mysql.fetchData(function(err,results){
													try{
														if (!err){
															  console.log("flag updated successfully.");
															  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
															  console.log("Query is:"+query);
															  mysql.fetchData(function(err,r){
															  	try{
															  		if (!err){
															  			  console.log("session id updated successfully");
															  			res.code = "200";
																		res.value = {"result":"Connection accepted successfully.", "error": false, "message": ""};		
																	    callback(null, res);
															  		  }
															  		  else{
															  			  console.log("session id updation failed.");
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
															  console.log("accepting connection failed.");
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
											  console.log("accepting connection failed.");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function showAvailableConnection_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT FirstName, Lastname, ShortDetail, UserId, City, State FROM userprofile";
							  query += " WHERE UserId NOT IN (SELECT OtherUserId FROM connections WHERE UserId = "+userId+") AND UserId != "+userId+"";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

function searchConnections_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var searchQuery = msg.searchquery;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "";
							  if(searchQuery == "all" || searchQuery == "undefined"){
								  
								  query = "SELECT FirstName, Lastname, ShortDetail, UserId, City, State FROM userprofile";
								  query += " WHERE UserId NOT IN (SELECT OtherUserId FROM connections WHERE UserId = "+userId+") AND UserId != "+userId+";";
							  }
							  else{

								  query = "SELECT FirstName, Lastname, ShortDetail, UserId, City, State FROM userprofile";
								  query += " WHERE UserId NOT IN (SELECT OtherUserId FROM connections WHERE UserId = "+userId+") AND UserId != "+userId+" AND CONCAT_WS(' ', FirstName, Lastname) LIKE '%" + searchQuery + "%'";
							  }
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in retrieving details.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":results, "error": false, "message": ""};		
													    callback(null, res);
											  		  }
											  		  else{
											  			  console.log("session id updation failed.");
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
											  console.log("Failed in retrieving details");
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
							  console.log("no active session found");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
							  callback(null, res);				  
						  }	
					}
					  else{
						  console.log("no active session found.");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No active session found. Please login again to create a valid session."};
						  callback(null, res);				  
					  }	
				  }
				  else{
					  console.log("error while fetchin session details.");
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

exports.addUserConnection_request = addUserConnection_request;
exports.showAddedConnection_request = showAddedConnection_request;
exports.showInvitedConnection_request = showInvitedConnection_request;
exports.showInvitation_request = showInvitation_request;
exports.showConnectionforDelete_request = showConnectionforDelete_request;
exports.deleteConnection_request = deleteConnection_request;
exports.acceptInvitation_request = acceptInvitation_request;
exports.showAvailableConnection_request = showAvailableConnection_request;
exports.searchConnections_request = searchConnections_request;