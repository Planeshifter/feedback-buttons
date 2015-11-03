(function($) {
	'use strict';

	$.fn.feedback = function( config ) {
		var str,
			tooltip;

		tooltip = {
			happy: 'I like this.',
			sad: 'I don\'t like this.',
			feedback: 'I have feedback.'
		};
		str  = '<div class="fb_line">';
		str += '<div class="fb_feedback fb_icon" data-tooltip="' + tooltip.feedback + '"';
		str += 'data-type="feedback"></div>';
		str += '<div class="fb_sad fb_icon" data-tooltip="' + tooltip.sad + '" data-type="sad"></div>';
		str += '<div class="fb_happy fb_icon" data-tooltip="' + tooltip.happy + '" data-type="happy"></div>';
		str += '</div>';
		str += '<div class="clear"></div>';
		this.append( str );

		$( '.fb_icon' ).mouseover( function onMouseover() {
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

		$( '.fb_icon' ).click( function onClick() {
			var grandParent = $(this).parent().parent();
			var type = $(this).attr( 'data-type' );
			switch ( type ) {
				case 'feedback':
					showFeedback( grandParent, config );
				break;
			}
		});
		return this;
	};

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
			str;

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
			$( '#fb_feedbackForm' ).submit( function onSubmit( event ) {
				var data = {};
				for ( var i = 1; i <= 4; i++ ) {
					data[ 'check' + i ] = $('#check' + i ).prop('checked');
				}
				data.comments = $( '#fb_feedbackText' ).val();
				data.id = element.attr( 'id' );
				sendData( data, config );
				event.preventDefault();
			});
			$( '#fb_skipBtn' ).click( function onClick() {
				$( '#fb_feedback' ).fadeOut();
			});
		} else {
			$( '#fb_feedback' ).fadeIn();
		}
	} // end FUNCTION showFeedback()

}(jQuery));
