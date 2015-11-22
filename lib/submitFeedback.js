'use strict';

// MODULES //

var $ = require( 'jquery' );


// FUNCTIONS //

var sendData = require( './sendData.js' ),
	showFeedbackResponse = require( './showFeedbackResponse.js' );

// SUBMIT FEEDBACK //

/**
* FUNCTION: submitFeedback( element )
*	Submits filled-out feedback form to server.
*
* @param {Object} element - DOM element to collect feedback for
* @param {Object} config - server configuration
* @returns {Void}
*/
function submitFeedback( element, config ) {
	var data = {};
	for ( var i = 1; i <= 4; i++ ) {
		data[ 'check' + i ] = $('#check' + i ).prop('checked');
	}
	data.comments = $( '#fb_feedbackText' ).val();
	data.type = 'feedback';
	data.id = element.attr( 'id' );
	sendData( data, config );
	showFeedbackResponse( 'feedback' );
} // end FUNCTION submitFeedback()


// EXPORTS //

module.exports = submitFeedback;
