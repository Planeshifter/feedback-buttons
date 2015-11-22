'use strict';

// MODULES //

var $ = require( 'jquery' );


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
