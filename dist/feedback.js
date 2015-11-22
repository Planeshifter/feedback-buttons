(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
* FUNCTION: generateID( no )
*	Generates a random user ID.
*
* @param {Number} no - number of random digits after timestamp
* @returns {String} id string
*/
function generateID( no ) {
	var s = '';
	s += new Date().getTime();
	s += '_';
	for ( var i = 0; i < no; i++ ) {
		s += parseInt( Math.random()*10, 10 );
	}
	return s;
} // end FUNCTION generateID()


// EXPORTS //

module.exports = generateID;

},{}],2:[function(require,module,exports){
'use strict';

// MODULES //

var generateID = require( './generateID.js' );


// GET USER DATA //

/**
* FUNCTION: getUserData()
*	Retrieves user data from localStorage.
*
* @returns {Object} user object
*/
function getUserData() {
	var userString = localStorage.getItem( 'Planeshifter_FB_PersistentData' ),
		user;
	if ( !userString ) {
		user = {
			id: generateID( 4 )
		};
		localStorage.setItem( 'Planeshifter_FB_PersistentData', JSON.stringify( user ) );
		return user;
	}
	return JSON.parse( userString );
} // end FUNCTION getUserData()


// EXPORTS //

module.exports = getUserData;

},{"./generateID.js":1}],3:[function(require,module,exports){
(function (global){
'use strict';

// MODULES //

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


// FUNCTIONS //

var showFeedback = require( './showFeedback.js' ),
	submitUnderstood = require( './submitUnderstood.js' ),
	submitConfused = require( './submitConfused.js' );


// JQUERY FEEDBACK BUTTONS PLUGIN //

$.fn.feedback = function feedback( config ) {
	var str,
		tooltip,
		$fb_icon;

	tooltip = {
		understood: 'That makes sense.',
		confused: 'I am confused.',
		feedback: 'I have feedback.'
	};
	str  = '<div class="fb_line">';
	str += '<div class="fb_feedback fb_icon" data-tooltip="' + tooltip.feedback + '"';
	str += 'data-type="feedback"></div>';
	str += '<div class="fb_confused fb_icon" data-tooltip="' + tooltip.confused + '" data-type="confused"></div>';
	str += '<div class="fb_understood fb_icon" data-tooltip="' + tooltip.understood + '" data-type="understood"></div>';
	str += '</div>';
	str += '<div class="clear"></div>';
	this.append( str );

	$fb_icon = $( '.fb_icon' );

	$fb_icon.mouseover( function onMouseover() {
		var tooltip,
			pos,
			text,
			$fb_tooltip;
		tooltip = document.getElementById( 'fb_tooltip' );
		if ( !tooltip ) {
			$( 'body' ).append( '<div id="fb_tooltip"></div>' );
		}
		pos = $(this).offset();
		text = $(this).attr( 'data-tooltip' );
		$fb_tooltip = $( '#fb_tooltip' );
		$fb_tooltip.css({
			left: pos.left - 90,
			top: pos.top + 30
		});
		$fb_tooltip.html( text );
	});

	$fb_icon.click( function onClick() {
		var grandParent = $(this).parent().parent();
		var type = $(this).attr( 'data-type' );
		switch ( type ) {
			case 'feedback':
				showFeedback( grandParent, config );
			break;
			case 'understood':
				submitUnderstood( grandParent, config );
			break;
			case 'confused':
				submitConfused( grandParent, config );
			break;
		}
	});
	return this;
};


// EXPORTS //

module.exports = $.fn.feedback;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./showFeedback.js":5,"./submitConfused.js":7,"./submitUnderstood.js":9}],4:[function(require,module,exports){
(function (global){
'use strict';

// MODULES //

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


// SEND DATA //

/**
* FUNCTION: sendData( data, config )
*	Sends data to server via AJAX.
*
* @param {Object} data - data to be sent
* @param {Object} config - server configuration
* @param {String} config.server - server name
* @param {Number} config.port - port of server
* @param {Function} [config.clbk] - callback function
* @returns {Void}
*/
function sendData( data, config ) {
	var url = config.server + ':' + config.port;
	$.ajax({
		method: 'POST',
		url: url,
		data: data
	}).done( function onDone( msg ) {
		if ( config.clbk) {
			config.clbk( msg );
		}
	});
} // end FUNCTION sendData()


// EXPORTS //

module.exports = sendData;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

// MODULES //

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


// FUNCTIONS //

var submitFeedback = require( './submitFeedback.js' );


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
			submitFeedback( element, config );
			$( '#fb_feedback' ).fadeOut();
			// Reset elements:
			$( '#fb_feedbackText' ).val( '' );
			$( '#fb_feedbackForm :checkbox').prop( 'checked', false );
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./submitFeedback.js":8}],6:[function(require,module,exports){
(function (global){
'use strict';

// MODULES //

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
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

},{"./getUserData.js":2,"./sendData.js":4,"./showFeedbackResponse.js":6}],8:[function(require,module,exports){
(function (global){
'use strict';

// MODULES //

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./sendData.js":4,"./showFeedbackResponse.js":6}],9:[function(require,module,exports){
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

},{"./getUserData.js":2,"./sendData.js":4,"./showFeedbackResponse.js":6}]},{},[3]);
