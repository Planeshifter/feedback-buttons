'use strict';

// FUNCTIONS //

var getUserData = require( './getUserData.js' ),
	sendData = require( './sendData.js' ),
	showFeedbackResponse = require( './showFeedbackResponse.js' );


// SUBMIT CONFUSED //

/**
* FUNCTION: submitConfused( element, config )
*	Submits to server that user understood element
*
* @param {Object} grandParent - DOM element to collect feedback for
* @param {Object} config - server configuration
* @returns {Void}
*/
function submitConfused( element, config ) {
	var data = {};
	data.id = element.attr( 'id' );
	data.userID = getUserData().id;
	data.type = 'confused';
	showFeedbackResponse( 'confused' );
	sendData( data, config );
} // end FUNCTION submitConfused()


// EXPORTS //

module.exports = submitConfused;
