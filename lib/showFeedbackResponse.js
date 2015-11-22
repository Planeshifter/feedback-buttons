'use strict';

// MODULES //

var $ = require( 'jquery' );


// SHOW FEEDBACK RESPONSE //

/**
* FUNCTION: showFeedbackResponse( type )
*	Shows a response after user has submitted his feedback.
*
* @param {String} type - feedback type
* @returns {Void}
*/
function showFeedbackResponse( type ) {
	var el,
		str,
		responseText,
		verticalPosition = $(document).scrollTop(),
		w = window.innerHeight,
		$fb_feedback_response;
	el = document.getElementById( 'fb_feedback_response' );
	switch ( type ) {
		case 'understood':
			responseText = 'Glad to hear that! Thank you for your feedback.';
		break;
		case 'confused':
			responseText = 'We are sorry to hear that. Your feedback helps us to improve the material.';
		break;
		case 'feedback':
		 	responseText = 'Thank you for taking time to share your feedback with us.';
		break;
	}
	if ( !el ) {
		str = '<div id="fb_feedback_response">';
		str += '</div>';
		$( 'body' ).append( str );
	}
	$fb_feedback_response = $( '#fb_feedback_response' );
	$fb_feedback_response.css( 'top', verticalPosition + w*0.1 );
	$fb_feedback_response.fadeIn();
	$( '#fb_feedback_response' ).html( '<p>' + responseText + '</p>' );
	window.setTimeout( function onTimeout() {
		$fb_feedback_response.fadeOut();
	}, 3000 );
} // end FUNCTION showFeedbackResponse()


// EXPORTS //

module.exports = showFeedbackResponse;
