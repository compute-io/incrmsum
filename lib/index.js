/**
*
*	COMPUTE: incrmsum
*
*
*	DESCRIPTION:
*		- Provides a method to compute a moving sum incrementally.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// INCREMENTAL MOVING SUM //

/**
* FUNCTION: incrmsum( W )
*	Returns a method to compute a moving sum incrementally.
*
* @param {Number} W - window size
* @returns {Function} method to compute a moving sum incrementally
*/
function incrmsum( W ) {
	if ( !isInteger( W ) || W < 1 ) {
		throw new TypeError( 'incrmsum()::invalid input argument. Window size must be a positive integer.' );
	}
	var arr = new Array( W ),
		sum = 0,
		N = 0,
		i = -1,
		tmp;
	/**
	* FUNCTION: incrmsum( [value] )
	*	If a `value` is provided, updates and returns the updated sum. If no `value` is provided, returns the current sum.
	*
	* @param {Number} [value] - value used to update the moving sum
	* @returns {Number} sum
	*/
	return function incrmsum( x ) {
		if ( !arguments.length ) {
			if ( N === 0 ) {
				return null;
			}
			return sum;
		}
		// Update the index for managing the circular buffer...
		i = (i+1) % W;

		// Fill up the initial window; else, update the existing window...
		if ( N < W ) {
			arr[ i ] = x;
			N += 1;
			sum += x;
		} else {
			tmp = arr[ i ];
			arr[ i ] = x;
			sum += x - tmp;
		}
		return sum;
	};
} // end FUNCTION incrmsum()


// EXPORTS //

module.exports = incrmsum;
