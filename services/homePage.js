var mysql = require('./mysql');

function getUserProfileData_request(msg, callback){
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
							  var query = "SELECT FirstName, Lastname, ShortDetail, Summary, Interest, EmailId, PhoneNumber, Birthday, MaritalStatus, City, State FROM userprofile ";
								query += "WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("user profile fetched successfully");
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
		res.value = {"result":"", "error": true, "message": ex.message };
		callback(null, res);
	}
}

function userFollowingCompany_request(msg, callback){
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
							  var query = "SELECT uc.CompanyId, Name, ImageURL, Company FROM companies comp ";
							  	query += "INNER JOIN usercompanies uc on uc.CompanyId = comp.CompanyId"
								query += " WHERE uc.UserId = " + userId + ";";
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

function getRecommendationDetails_request(msg, callback){
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
							  var query = "SELECT CONCAT_WS(' ', FirstName, Lastname) AS Name, ShortDetail, Description FROM recommendations rec ";
								query += "INNER JOIN userprofile user on user.UserId = rec.RecommendedBy WHERE rec.UserId = " + userId + ";";
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
											  			  res.status(500).json({"result":"", "error": true, "message": err});				  
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

function userProjectDetails_request(msg, callback){
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
							  var query = "SELECT Name, MONTHNAME(STR_TO_DATE(StartDateMonth, '%m')) AS StartDateMonth, StartDateYear, Description FROM projects ";
								query += "WHERE ExperienceId IN (SELECT ExperienceId from experience WHERE UserId = " + userId + ")";
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

function getuserEducatioonDetails_request(msg, callback){
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
							  var query = "SELECT School, NAME, FieldofStudy, Grades, StartYear, EndYear FROM education edu ";
								query += "INNER JOIN degree deg on deg.Degree = edu.Degree  WHERE edu.UserId = " + userId + ";";
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

function getuserExperienceDetails_request(msg, callback){
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
							  var query = "SELECT CompanyName, Title, MONTHNAME(STR_TO_DATE(StartDateMonth, '%m')) AS StartDateMonth, StartDateYear, ";
								query += "MONTHNAME(STR_TO_DATE(EndDateMonth, '%m')) AS EndDateMonth, EndDateYear, Location, Description FROM experience WHERE UserId = " + userId + ";";
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

function getEndorsedSkills_request(msg, callback){
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
							  var query = "SELECT Name, SkillId, EndorseCount FROM skills WHERE UserId = " + userId + ";";
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

function getLastLoginTime_request(msg, callback){
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
							  var query = "SELECT LastLogin FROM users ";
								query += "WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("last login fetched successfully");
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
											  console.log("error while fetching last login details.");
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


exports.getUserProfileData_request = getUserProfileData_request;
exports.userFollowingCompany_request = userFollowingCompany_request;
exports.getRecommendationDetails_request = getRecommendationDetails_request;
exports.userProjectDetails_request = userProjectDetails_request;
exports.getuserEducatioonDetails_request = getuserEducatioonDetails_request;
exports.getuserExperienceDetails_request = getuserExperienceDetails_request;
exports.getEndorsedSkills_request = getEndorsedSkills_request;
exports.getLastLoginTime_request = getLastLoginTime_request;