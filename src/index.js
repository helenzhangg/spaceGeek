/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "A year on Mercury is just 88 days long.",
    "On Mars, the Sun appears about half the size as it does on Earth.",
    "Earth is the only planet not named after a god.",
    "A day on Jupiter lasts only 9 hours and 55 minutes.",
    "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
    "The Sun contains 99.86% of the mass in the Solar System.",
    "A total solar eclipse can happen once every 1 to 2 years.",
    "The temperature inside the Sun can reach 15 million degrees Celsius.",
    "The Moon is moving approximately 3.8 cm away from our planet every year.",
    "The mass of the Sun distorts spacetime enough to cause planets to follow geodesics, otherwise planets would travel through space in straight lines.",
    "Our univerise is expanding by about 67 kilometers per second.",
    "Andromeda is our closest neighboring galaxy and it is about 2.5 million light years away.",
    "Black holes are formed when large stars collapse in on themselves.",
    "It takes our solar system 250 million years to complete one orbit around the milky-way.",
    "In order for Earth to become a black hole, its mass would have to be compressed to the size of a marble.",
    "All the stars, planets, and galaxies only make up less than 5% of the universe, the rest is dark energy and dark matter",
    "There is an uncountable number of stars in the universe.",
    "We cannot look up into space without looking back in time.",
    "If you traveled at 99% the speed of light, time would slow down by a factor of 7.",
    "Jupiter is the most massive planet in our Solar System... it would take 317 Earths to equal Jupiter's mass.",
    "You could fit all the planets in our Solar System between Earth and its moon.",
    "A year on Saturn is equivalent to 29 Earth years.",
    "The day Saturday was named after Saturn.",
    "The gravitational pull of the Moon causes tides on Earth.",
    "The Giant-impact hypothesis suggests that the Moon was originally a part of Earth, and is the result of a collision between Earth and a Mars sized astronomical body.",
    "Black holes have such a strong gravitational pull that nothing can escape them, this includes light.",
    "There are at least 100 billion galaxies in the observable universe.",
    "The Earth is rotating around the Sun at around 67,000 miles per hour.",
    "Due to the lack of gravity in space, most astronauts grow taller. After returning to Earth, they go back to their original height.",
    "Unlike the Force, gravity only attracts... it never repels.",
    "If you weigh 150 pounds on Earth, you would weigh 384 pounds on Jupiter. This is because of Jupiter's immense gravitational pull.",
    "Mars has the tallest mountain in our Solar System, with a height of 16 miles, it is about three times taller than Mount. Everest."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
