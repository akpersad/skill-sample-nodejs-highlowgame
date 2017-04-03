'use strict';
var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var storage = (function() {
	var dynamodb = new AWS.DynamoDB.DocumentClient();
	return {
		save: function(policy, session, callback) {
			var params = {
				TableName: 'policyDemo',
				Item: {
					UserId: session.user.userId,
					Policy: policy
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(policy);
			})
		},
		getPolicy: function(session, callback) {
			var params = {
				TableName: 'policyDemo',
				Key: {
					UserId: session.user.userId
				}
			};
			dynamodb.get(params, function(err, data) {
				callback(data.Item.Policy);
			});
		}
	}
})();

module.exports = storage;
