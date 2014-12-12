'use strict';

var incrmsum = require( './../lib' );

// Initialize a method to calculate the moving sum incrementally:
var msum = incrmsum( 5 );

// Simulate some data...
var value, sum;

console.log( '\nValue\tSum\n' );

for ( var i = 0; i < 100; i++ ) {

	value = Math.random() * 100;
	sum = msum( value );

	console.log( '%d\t%d', value.toFixed( 4 ), sum.toFixed( 4 ) );
}
