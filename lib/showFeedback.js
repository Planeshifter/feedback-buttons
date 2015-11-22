'use strict';

// MODULES //

var $ = require( 'jquery' );


// FUNCTIONS //

var sendData = require( './sendData.js' );


// SHOW FEEDBACK //

/**
* FUNCTION: showFeedback( element )
*	Display feedback form for element.
*
* @param {Object} element - DOM element to collect feedback for
* @param {Object} config - server configuration
* @returns {Void}
*/
function showFeedback( element, config ) {
	var el,
		str,
		verticalPosition = $(document).scrollTop(),
		w = window.innerHeight,
		$fb_feedback;

	el = document.getElementById( 'fb_feedback' );

	if ( !el ) {
		str = '<div id="fb_feedback">';
		str += '<button id="fb_skipBtn">Close</button>';
		str += '<div id="fb_feedbackTitle">Feedback</div>';
		str += '<form id="fb_feedbackForm">';
		str += '<input type="checkbox" id="check1">I don\'t understand this at all.<br>';
		str += '<input type="checkbox" id="check2">This needs a more detailed explanation.<br>';
		str += '<input type="checkbox" id="check3">I can\'t follow the logic.<br>';
		str += '<input type="checkbox" id="check4">I have the following comments:<br>';
		str += '<textarea id="fb_feedbackText"></textarea>';
		str += '<input type="submit" id="fb_submitBtn" value="Submit">';
		str += '</form>';
		str += '</div>';
		$( 'body' ).append( str );

		$fb_feedback = $( '#fb_feedback' );
		$fb_feedback.css( 'top', verticalPosition + w*0.1 );

		$( '#fb_feedbackForm' ).submit( function onSubmit( event ) {
			var data = {};
			for ( var i = 1; i <= 4; i++ ) {
				data[ 'check' + i ] = $('#check' + i ).prop('checked');
			}
			data.comments = $( '#fb_feedbackText' ).val();
			data.type = 'feedback';
			data.id = element.attr( 'id' );
			sendData( data, config );
			event.preventDefault();
		});
		$( '#fb_skipBtn' ).click( function onClick() {
			$fb_feedback.fadeOut();
		});
	} else {
		$fb_feedback = $( '#fb_feedback' );
		$fb_feedback.css( 'top', verticalPosition + w*0.1 );
		$fb_feedback.fadeIn();
	}
} // end FUNCTION showFeedback()


// EXPORTS //

module.exports = showFeedback;
