'use strict';

// MODULES //

var $ = require( 'jquery' );


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
