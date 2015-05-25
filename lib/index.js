'use strict';

// MODULES //

var isPositiveInteger = require( 'validate.io-positive-integer' );


// INCREMENTAL MOVING SUM //

/**
* FUNCTION: incrmsum( W )
*	Returns a method to compute a moving sum incrementally.
*
* @param {Number} W - window size
* @returns {Function} method to compute a moving sum incrementally
*/
function incrmsum( W ) {
	if ( !isPositiveInteger( W ) ) {
		throw new TypeError( 'incrmsum()::invalid input argument. Window size must be a positive integer. Value: `' + W + '`.' );
	}
	var arr = new Array( W ),
		sum = 0,
		N = 0,
		i = -1;
	/**
	* FUNCTION: incrmsum( [value] )
	*	If a `value` is provided, updates and returns the updated sum. If no `value` is provided, returns the current sum.
	*
	* @param {Number} [value] - value used to update the moving sum
	* @returns {Number|Null} sum or null
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
			N += 1;
			sum += x;
		} else {
			sum += x - arr[ i ];
		}
		arr[ i ] = x;
		return sum;
	};
} // end FUNCTION incrmsum()


// EXPORTS //

module.exports = incrmsum;
