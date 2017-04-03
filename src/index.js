// Lambda Node.JS
'use strict';
var Alexa = require("alexa-sdk");
var storage = require("./storage");

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();

};

const handlers = {
    'LaunchRequest': function () {
        var welcomeMessage = 'Hello! How can I help you today?';
        this.emit(':ask', welcomeMessage, 'Try again.');
    },

    'SavePolicyIntent': function () {
        var policy = this.event.request.intent.slots.policy.value;
        var response = '';

        storage.save(policy, this.event.session, (policy) => {
            response = 'Ok, saving the ' + policy + ' policy to read later';
            this.emit(':ask', response);
        });
    },

    'GetSavePolicyIntent': function () {
        var policy = this.event.request.intent.slots.policy.value;
        var response = '';

        storage.getPolicy(this.event.session, (policy) => {
            response = "The " + policy + ' policy was saved for later.';
            this.emit(':ask', response);
        });
    },

    'PolicyInfoIntent': function () {
        var policy = this.event.request.intent.slots.policy.value;
        var answer = '';

        if (policy === 'benefits') {
            answer = 'You have a ton of benefits including health insurance, dental, vision and a free car.';
        } else if (policy === 'pto') {
            answer = 'You get a year off';
        } else if (policy === 'holiday') {
            answer = 'You get all the holidays.';
        } else if (policy === 'project') {
            answer = 'You are on all of the projects. No life for you.';
        }

        this.emit(':ask', answer);
    },

    'Unhandled': function () {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Say the name of a policy to learn more about your options.', 'try again');
    },

    'AMAZON.StopIntent': function () {
        var say = 'Adios Amigo';

        this.emit(':tell', say);
    }

}
