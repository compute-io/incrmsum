/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	incrmsum = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-incrmsum', function tests() {

	it( 'should export a function', function test() {
		expect( incrmsum ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer', function test() {
		var values = [
			'5',
			-5,
			0,
			Math.PI,
			true,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				incrmsum( value );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( incrmsum( 3 ) ).to.be.a( 'function' );
	});

	it( 'should compute a moving sum incrementally', function test() {
		var data,
			N,
			d,
			expected,
			actual,
			msum;

		data = [ 2, 3, 2, 4, 3, 4 ];
		N = data.length;

		msum = incrmsum( 3 );

		actual = new Array( N );
		for ( var i = 0; i < N; i++ ) {
			d = data[ i ];
			actual[ i ] = msum( d );
		}

		expected = [ 2, 5, 7, 9, 9, 11 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return the current moving sum if provided no arguments', function test() {
		var data = [ 2, 3, 5 ],
			msum = incrmsum( 2 );
		for ( var i = 0; i < data.length; i++ ) {
			msum( data[ i ] );
		}
		assert.strictEqual( msum(), 8 );
	});

	it( 'should return null if asked for a moving sum when not having received any data', function test() {
		var msum = incrmsum( 3 );
		assert.isNull( msum() );
	});

});
