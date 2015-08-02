//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var profile = require('./services/profile');
var homePage = require('./services/homePage');
var member = require('./services/members');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");
	
	// login queue
	
	cnn.queue('login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch(parseInt(message.apiId)){
			case 1:
				login.login_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 2:
				login.logout_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 3:
				login.signup_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 4:
				login.updatelastlogin_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			}
		});
	});
	
	
	// member queue
	console.log("listening on members_queue");
	
	cnn.queue('members_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch(parseInt(message.apiId)){
			case 5:
				member.addUserConnection_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 6:
				member.showAddedConnection_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 7:
				member.showInvitedConnection_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 8:
				member.showInvitation_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 9:
				member.showConnectionforDelete_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 10:
				member.deleteConnection_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 11:
				member.showAvailableConnection_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 12:
				member.acceptInvitation_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 13:
				member.searchConnections_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
				
			}
		});
	});
	
	// profile queue
	console.log("listening on profile_queue");
	
	cnn.queue('profile_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch(parseInt(message.apiId)){
			case 14:
				homePage.getUserProfileData_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 15:
				homePage.userFollowingCompany_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 16:
				homePage.getRecommendationDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 17:
				homePage.userProjectDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 18:
				homePage.getuserEducatioonDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 19:
				homePage.getuserExperienceDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 20:
				homePage.getEndorsedSkills_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 21:
				homePage.getLastLoginTime_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 22:
				profile.getCompanies_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 23:
				profile.followCompanies_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 24:
				profile.recommendUser_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 25:
				profile.getuserProfileDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 26:
				profile.updateuserProfile_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 27:
				profile.addSkills_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 28:
				profile.getSkills_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 29:
				profile.reloadSkill_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 30:
				profile.deleteSkills_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 31:
				profile.getUsers_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 32:
				profile.loadSkillsTobeEndorsed_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 33:
				profile.endorseSkills_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 34:
				profile.addExperience_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 35:
				profile.getExperienceDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 36:
				profile.getExperienceDetailsById_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 37:
				profile.updateExperience_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 38:
				profile.deleteExperience_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 39:
				profile.addEducation_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;
			case 40:
				profile.getEducationDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 41:
				profile.getEducationDetailsById_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 42:
				profile.updateEducation_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 43:
				profile.deleteEducation_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 44:
				profile.addProject_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 45:
				profile.getAllExperienceDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 46:
				profile.getAllProjectDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 47:
				profile.loadProjectDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 48:
				profile.updateProjectDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;	
			case 49:
				profile.deleteProjectDetails_request(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
				break;				
			}
		});
	});	
});

