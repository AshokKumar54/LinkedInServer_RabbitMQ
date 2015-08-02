var mysql = require('./mysql');

// Companies following

function getCompanies_request(msg, callback){
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
							  var query = "SELECT CompanyId, Name, ImageURL, Company FROM companies";
								query += " WHERE CompanyId NOT IN(SELECT CompanyId FROM usercompanies WHERE UserId = " + userid + ");";
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

function followCompanies_request(msg, callback){
	try{
		var res = {};
		var companyId = parseInt(msg.companyId);
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
							  var query = "INSERT INTO usercompanies(UserId, CompanyId) VALUES(" + userId + "," + companyId + ");";		
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Success in added successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Company added successfully.", "error": false, "message": ""};		
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
											  console.log("Failed in updating details");
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


// Recommendations

function recommendUser_request(msg, callback){
	try{		
		var res = {};
		var userId = parseInt(req.param("userid"));
		var token = req.param("token");
		var otheruserId = req.param("otheruserid");
		var description = req.param("description");
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO recommendations(UserId, RecommendedBy, Description)";	
								query += " VALUES(" + otheruserId + ", " + userId + ", '" + description + "')"
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Recommendation added successfully");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Recommendation added successfully.", "error": false, "message": ""};		
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
											  console.log("error while adding recommendation.");
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

// User Profile

function updateuserProfile_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var firstname = msg.firstname;
		var lastname = msg.lastname;
		var city = msg.city;
		var state = msg.state;
		var shortDetail = msg.shortdetail;
		var summary = msg.summary;
		var interest = msg.interest;
		var birthday = msg.birthday;
		var maritalStatus = msg.maritalstatus;
		var phonenumber = msg.phonenumber;
		var emailId = msg.emailid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "UPDATE userprofile SET FirstName = '" + firstname + "', Lastname = '" + lastname + "', ShortDetail = '" + shortDetail + "', ";
								query = query + "EmailId = '" + emailId + "', City = '" + city + "', State = '" + state + "', Birthday = '" + birthday + "', Summary = '" + summary + "', MaritalStatus = '" + maritalStatus + "', PhoneNumber = '" + phonenumber + "', Interest = '" + interest + "' WHERE UserId = "+ userId +";";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("user profile updated successfully");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"user profile updated successfully.", "error": false, "message": ""};		
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
											  console.log("error while updating user profile details.");
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

function getuserProfileDetails_request(msg, callback){
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
							  var query = "SELECT UserId, FirstName, Lastname, Interest, ShortDetail, EmailId, City, State, Birthday, Summary, MaritalStatus, PhoneNumber FROM userprofile ";
								query += "WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("user profile details fetched successfully");
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
		res.value = {"result":"", "error": true, "message": ex.message};		
	    callback(null, res);
	}
}


// Skills

function addSkills_request(msg, callback){
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
							  var skillName = msg.skillName;
								var query = "INSERT INTO skills (UserId, Name, EndorseCount)";
								query = query + "VALUES(" + userId + ", '" + skillName + "', 0);";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Skills added successfully");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Skills added successfully", "error": false, "message": ""};		
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
											  console.log("error while adding skills.");
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

function getSkills_request(msg, callback){
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
							  var query = "SELECT SkillId, Name FROM skills WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Skills fetched successfully");
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
											  console.log("error while fetching skills.");
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

function reloadSkill_request(msg, callback){
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
							  var query = "SELECT SkillId, Name FROM skills WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Skills fetched successfully");
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
											  console.log("error while fetching skills.");
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

function deleteSkills_request(msg, callback){
	try{		
		var res = {};
		var skillId = parseInt(msg.skillid);
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
							  var query = "DELETE FROM skills WHERE SkillId = " + skillId + ";";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Skill deleted successfully");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Skills deleted successfully", "error": false, "message": ""};		
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
											  console.log("error while deleting skill.");
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

function getUsers_request(msg, callback){
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
							  var query = "SELECT CONCAT_WS(' ', FirstName, Lastname) AS Name, conn.OtherUserId FROM userprofile user";
								query += " INNER JOIN connections conn on conn.OtherUserId = user.UserId WHERE conn.UserId = " + userId + " AND conn.IsInvitation = 0;";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("User details fetched successfully successfully");
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
											  console.log("error while fetching user details.");
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

function loadSkillsTobeEndorsed_request(msg, callback){
	try{		
		var res = {};
		var otheruserId = parseInt(msg.otheruserid);
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
							  var query = "SELECT Name, SkillId FROM skills WHERE UserId = " + otheruserId + " AND SkillId ";	
								query += "NOT IN (SELECT SkillId FROM EndorsedSkills);";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("User details fetched successfully successfully");
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
											  console.log("error while fetching user details.");
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

function endorseSkills_request(msg, callback){
	try{		
		var res = {};
		var otheruserId = parseInt(msg.otheruserid);
		var token = msg.token;
		var skillid = parseInt(msg.skillid);
		var userid = parseInt(msg.userid);
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO EndorsedSkills(SkillId, UserId, OtherUserId)";	
								query += " VALUES(" + skillid + ", " + userid + ", " + otheruserId + ");";								
								console.log("Query is:"+query);
								//query for updating endorsed skills
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Skill endorsed successfully");
											//query for updating the count
											  var newquery = "UPDATE skills SET EndorseCount = (SELECT COUNT(Id) FROM EndorsedSkills WHERE SkillId = " + skillid + " AND UserId = " + userid + ") WHERE SkillId = " + skillid + " AND UserId = " + otheruserId + ";";
												mysql.fetchData(function(err,results){
													try{
														if (!err){
															  console.log("Skill count updated successfully");
															  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
															  console.log("Query is:"+query);
															  mysql.fetchData(function(err,r){
															  	try{
															  		if (!err){
															  			  console.log("session id updated successfully");
															  			res.code = "200";
																		res.value = {"result":"Skills endorsed successfully", "error": false, "message": ""};		
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
															  console.log(err.message);	
															  res.code = "500";
																res.value = {"result":"", "error": true, "message": err.message};		
															    callback(null, res);
														  }
													} catch(err){
														console.log(err.message);	
														res.code = "500";
														res.value = {"result":"", "error": true, "message": err.message};		
													    callback(null, res);
													}  
												},newquery);
										  }
										  else{
											  console.log("error while endorsing skill.");
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


// Experience

function addExperience_request(msg, callback){
	try{	
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var companyName = msg.companyname;
		var title = msg.title;
		var location = msg.location;
		var startdatemonth = msg.startdatemonth;
		var startdateyear = msg.startdateyear;
		var enddatemonth = msg.enddatemonth;
		var enddateyear = msg.enddateyear;
		var islatest = parseInt(msg.islatest);
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO experience (UserId, CompanyName, Title, Location, StartDateMonth, StartDateYear, EndDateMonth, EndDateYear, IsLatest, Description)";
								query = query + "VALUES(" + userId + ", '" + companyName + "', '" + title + "', '" + location + "', '" + startdatemonth + "', '" + startdateyear + "', '" + enddatemonth + "', '" + enddateyear + "', " + islatest + ", '" + description + "');";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience added successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Experience added successfully.", "error": false, "message": ""};		
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
											  console.log("error while adding experience.");
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

function getExperienceDetails_request(msg, callback){
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
							  var query = "SELECT ExperienceId, CompanyName";	
								query += " FROM experience WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience details fetched successfully.");
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
											  console.log("error while fetching experience details.");
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

function getExperienceDetailsById_request(msg, callback){
	try{		
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var experienceId = msg.experienceid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT ExperienceId, CompanyName, Title, Location, StartDateMonth, StartDateYear, EndDateMonth, EndDateYear, IsLatest, Description";	
								query += " FROM experience WHERE ExperienceId = " + experienceId + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience details fetched successfully.");
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
											  console.log("error while fetching experience details.");
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

function updateExperience_request(msg, callback){
	try{	
		var res = {};
		var experienceId = parseInt(msg.experienceid);
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var companyName = msg.companyname;
		var title = msg.title;
		var location = msg.location;
		var startdatemonth = msg.startdatemonth;
		var startdateyear = msg.startdateyear;
		var enddatemonth = msg.enddatemonth;
		var enddateyear = msg.enddateyear;
		var islatest = parseInt(msg.islatest);
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "UPDATE experience SET UserId = " + userId + ", CompanyName = '" + companyName + "', Title = '" + title + "', Location = '" + location;
								query = query + "', StartDateMonth = '" + startdatemonth + "', StartDateYear = " + startdateyear + ", EndDateMonth = " + enddatemonth;	
								query = query + ", EndDateYear = " + enddateyear + ", IsLatest = " + islatest + ", Description = '" + description + "' WHERE ExperienceId = " + experienceId + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience updated successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Experience updated successfully.", "error": false, "message": ""};		
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
											  console.log("error while updating experience.");
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

function deleteExperience_request(msg, callback){
	try{	
		var res = {};
		var token = msg.token;
		var experienceId = parseInt(msg.experienceId);
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "DELETE FROM experience WHERE ExperienceId = " + experienceId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience deleted successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Experience deleted successfully.", "error": false, "message": ""};		
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
											  console.log("error while deleting experience.");
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
		res.value = {"result":"", "error": true, "message": err.message};		
	    callback(null, res);
	}
}

// Education

function addEducation_request(msg, callback){
	try{		
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var school = msg.school;
		var startdateyear = msg.startdateyear;
		var enddateyear = msg.enddateyear;
		var degree = msg.degree;
		var grades = msg.grades;
		var fieldofstudy = msg.fieldofstudy;
		var activitiesandsocieties = msg.activitiesandsocieties;
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO education (UserId, School, StartYear, EndYear, Degree, Grades, FieldofStudy, ActivitiesAndSocieties, Description)";
								query = query + "VALUES(" + userId + ", '" + school + "', " + startdateyear + ", " + enddateyear + ", '" + degree + "', '" + grades + "', '" + fieldofstudy + "', '" + activitiesandsocieties + "', '" + description + "');";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Education added successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Education added successfully.", "error": false, "message": ""};		
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
											  console.log("error while adding education.");
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

function getEducationDetails_request(msg, callback){
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
							  var query = "SELECT Id, School";	
								query += " FROM education WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Education details fetched successfully.");
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
											  console.log("error while fetching education details.");
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

function getEducationDetailsById_request(msg, callback){
	try{		
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var educationid = msg.educationid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT School, StartYear, EndYear, Degree, Grades, FieldofStudy, ActivitiesAndSocieties, Description";	
								query += " FROM education WHERE Id = " + educationid + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Education details fetched successfully.");
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
											  console.log("error while fetching education details.");
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

function updateEducation_request(msg, callback){
	try{	
		var res = {};
		var educationid = msg.educationid;
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var school = msg.school;
		var startdateyear = msg.startdateyear;
		var enddateyear = msg.enddateyear;
		var degree = msg.degree;
		var grades = msg.grades;
		var fieldofstudy = msg.fieldofstudy;
		var activitiesandsocieties = msg.activitiesandsocieties;
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "UPDATE education SET UserId = " + userId + ", School = '" + school + "', StartYear = " + startdateyear + ", EndYear = " + enddateyear;
								query = query + ", Degree = '" + degree + "', Grades = '" + grades + "', FieldofStudy = '" + fieldofstudy;	
								query = query + "', ActivitiesAndSOcieties = '" + activitiesandsocieties + "', Description = '" + description + "' WHERE Id = " + educationid + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Education updated successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Education updated successfully.", "error": false, "message": ""};		
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
											  console.log("error while updating education.");
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

function deleteEducation_request(msg, callback){
	try{	
		var res = {};
		var token = msg.token;
		var educationid = msg.educationid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "DELETE FROM education WHERE Id = " + educationid + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Education deleted successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Education deleted successfully.", "error": false, "message": ""};		
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
											  console.log("error while deleting education.");
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

// Project

function addProject_request(msg, callback){
	try{		
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var experienceid = parseInt(msg.experienceid);
		var name = msg.projectname;
		var startdatemonth = msg.startdatemonth;
		var startdateyear = msg.startdateyear;
		var enddatemonth = msg.enddatemonth;
		var enddateyear = msg.enddateyear;
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "INSERT INTO projects (ExperienceId, Name, UserId, StartDateMonth, StartDateYear, EndDateMonth, EndDateYear, Description)";
								query = query + " VALUES(" + experienceid + ", '"+ name  + "', " + userId + ", '" + startdatemonth + "', '" + startdateyear + "', " + enddatemonth + ", " + enddateyear + ", '" + description + "');";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Project added successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Project added successfully.", "error": false, "message": ""};		
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
											  console.log("error while adding project.");
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

function getAllExperienceDetails_request(msg, callback){
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
							  var query = "SELECT ExperienceId, CompanyName";	
								query += " FROM experience WHERE UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience details fetched successfully.");
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
											  console.log("error while fetching experience details.");
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

function getAllProjectDetails_request(msg, callback){
	try{
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var experienceId = msg.experienceid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT ID, Name FROM projects";	
								query += " WHERE ExperienceId = " + experienceId + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Project details fetched successfully.");
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
											  console.log("error while fetching project details.");
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

function loadProjectDetails_request(msg, callback){
	try{	
		var res = {};
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var projectId = msg.projectid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "SELECT Name, StartDateMonth, StartDateYear, EndDateMonth, EndDateYear, Description";	
								query += " FROM projects WHERE Id = " + projectId + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Experience details fetched successfully.");
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
											  console.log("error while fetching experience details.");
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

function updateProjectDetails_request(msg, callback){
	try{	
		var res = {};
		var projectid = msg.projectid;
		var userId = parseInt(msg.userid);
		var token = msg.token;
		var experienceid = parseInt(msg.experienceid);
		var name = msg.projectname;
		var startdatemonth = msg.startdatemonth;
		var startdateyear = msg.startdateyear;
		var enddatemonth = msg.enddatemonth;
		var enddateyear = msg.enddateyear;
		var description = msg.description;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "UPDATE projects SET Name = '" + name + "', UserId = " + userId + ", ExperienceId = '" + experienceid;
								query = query + "', StartDateMonth = '" + startdatemonth + "', StartDateYear = " + startdateyear + ", EndDateMonth = " + enddatemonth;	
								query = query + ", EndDateYear = " + enddateyear + ", Description = '" + description + "' WHERE Id = " + projectid + " AND UserId = " + userId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Project updated successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Project updated successfully.", "error": false, "message": ""};		
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
											  console.log("error while updating project.");
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

function deleteProjectDetails_request(msg, callback){
	try{	
		var res = {};
		var token = msg.token;
		var projectId = msg.projectid;
		var query = "SELECT Id FROM session sess WHERE TIMESTAMPDIFF(MINUTE, sess.LastCommunicationTime, NOW()) < " + 10 + " AND SessionId = '" + token + "' ORDER BY LastCommunicationTime DESC;";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,result){
			try{
				if (!err){
					if(result.length > 0){
						  if(result[0].Id > 0){
							  console.log("active session found");
							  //write you code
							  var query = "DELETE FROM projects WHERE Id = " + projectId + ";";
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){
											  console.log("Project deleted successfully.");
											  var query = "UPDATE Session SET LastCommunicationTime = NOW() WHERE SessionId = '" + token + "'";
											  console.log("Query is:"+query);
											  mysql.fetchData(function(err,r){
											  	try{
											  		if (!err){
											  			  console.log("session id updated successfully");
											  			res.code = "200";
														res.value = {"result":"Project deleted successfully.", "error": false, "message": ""};		
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
											  console.log("error while deleting project.");
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

//Companies following
exports.getCompanies_request = getCompanies_request;
exports.followCompanies_request = followCompanies_request;
//Recommendations
exports.recommendUser_request = recommendUser_request;
//User profile
exports.getuserProfileDetails_request = getuserProfileDetails_request;
exports.updateuserProfile_request = updateuserProfile_request;
//Skills
exports.addSkills_request = addSkills_request;
exports.getSkills_request = getSkills_request;
exports.reloadSkill_request = reloadSkill_request;
exports.deleteSkills_request = deleteSkills_request;
exports.getUsers_request = getUsers_request;
exports.loadSkillsTobeEndorsed_request = loadSkillsTobeEndorsed_request;
exports.endorseSkills_request = endorseSkills_request;
//Experience
exports.addExperience_request = addExperience_request;
exports.getExperienceDetails_request = getExperienceDetails_request;
exports.getExperienceDetailsById_request = getExperienceDetailsById_request;
exports.updateExperience_request = updateExperience_request;
exports.deleteExperience_request = deleteExperience_request;
//Education
exports.addEducation_request = addEducation_request;
exports.getEducationDetails_request = getEducationDetails_request;
exports.getEducationDetailsById_request = getEducationDetailsById_request;
exports.updateEducation_request = updateEducation_request;
exports.deleteEducation_request = deleteEducation_request;
//Project
exports.addProject_request = addProject_request;
exports.getAllExperienceDetails_request = getAllExperienceDetails_request;
exports.getAllProjectDetails_request = getAllProjectDetails_request;
exports.loadProjectDetails_request = loadProjectDetails_request;
exports.updateProjectDetails_request = updateProjectDetails_request;
exports.deleteProjectDetails_request = deleteProjectDetails_request;