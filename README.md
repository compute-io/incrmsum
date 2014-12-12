incrmsum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a method to compute a moving sum incrementally.


## Installation

``` bash
$ npm install compute-incrmsum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var incrmsum = require( 'compute-incrmsum' );
```

#### incrmsum( window )

Returns an initialized method to compute a moving sum incrementally. `window` sets the window size, i.e., the number of values over which to compute a moving sum.

``` javascript
var msum = incrmsum( 3 );
```

#### msum( [value] )

If provided a `value`, the method updates and returns the sum of the current window. If not provided a `value`, the method returns the current sum.

``` javascript
var sum;

// Filling window...
sum = msum( 2 );
// sum is 2

msum( 3 );
// sum is 5

msum( 2 );
// sum is 7

// Window starts sliding...
msum( -2 );
// sum is 3

msum( 9 );
// sum is 9

sum = msum();
// returns 9
```


## Notes

1. 	If values have not yet been provided to `msum`, `msum` returns `null`.
1. 	The first `W-1` returned sums will have less statistical support than subsequent moving sums, as `W` values are needed to fill the window buffer. Until the window is full, the value returned equals the [sum](https://github.com/compute-io/sum) of all values provided thus far.

The use case for this module differs from the conventional [vector](https://github.com/compute-io/msum) implementation and the [stream](https://github.com/flow-io/) implementation. Namely, this module decouples the act of updating the moving sum from the act of consuming the moving sum.



## Examples

``` javascript
var incrmsum = require( 'compute-incrmsum' );

// Initialize a method to calculate the moving sum incrementally:
var msum = incrmsum( 5 ),
	sum;

// Simulate some data...
for ( var i = 0; i < 1000; i++ ) {
	sum = msum( Math.random()*100 );
	console.log( sum );
}
sum = msum();
console.log( sum );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-incrmsum.svg
[npm-url]: https://npmjs.org/package/compute-incrmsum

[travis-image]: http://img.shields.io/travis/compute-io/incrmsum/master.svg
[travis-url]: https://travis-ci.org/compute-io/incrmsum

[coveralls-image]: https://img.shields.io/coveralls/compute-io/incrmsum/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/incrmsum?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/incrmsum.svg
[dependencies-url]: https://david-dm.org/compute-io/incrmsum

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/incrmsum.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/incrmsum

[github-issues-image]: http://img.shields.io/github/issues/compute-io/incrmsum.svg
[github-issues-url]: https://github.com/compute-io/incrmsum/issues
