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
