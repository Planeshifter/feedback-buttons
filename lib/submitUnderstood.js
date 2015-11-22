'use strict';

// FUNCTIONS //

var getUserData = require( './getUserData.js' ),
	sendData = require( './sendData.js' ),
	showFeedbackResponse = require( './showFeedbackResponse.js' );


// SUBMIT UNDERSTOOD //

/**
* FUNCTION: submitUnderstood( element, config )
*	Submits to server that user understood element
*
* @param {Object} grandParent - DOM element to collect feedback for
* @param {Object} config - server configuration
* @returns {Void}
*/
function submitUnderstood( element, config ) {
	var data = {};
	data.id = element.attr( 'id' );
	data.userID = getUserData().id;
	data.type = 'understood';
	showFeedbackResponse( 'understood' );
	sendData( data, config );
} // end FUNCTION submitUnderstood()

// EXPORTS //

module.exports = submitUnderstood;
