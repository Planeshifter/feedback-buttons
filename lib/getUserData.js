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
