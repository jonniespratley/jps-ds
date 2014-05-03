'use strict';
/*
 ======== A Handy Little QUnit Reference ========
 http://api.qunitjs.com/

 Test methods:
 module(name, {[setup][ ,teardown]})
 test(name, callback)
 expect(numberOfAssertions)
 stop(increment)
 start(decrement)
 Test assertions:
 ok(value, [message])
 equal(actual, expected, [message])
 notEqual(actual, expected, [message])
 deepEqual(actual, expected, [message])
 notDeepEqual(actual, expected, [message])
 strictEqual(actual, expected, [message])
 notStrictEqual(actual, expected, [message])
 throws(block, [expected], [message])
 */
var DS = require( '../src/ds.js' ).DS;
var _ds = new DS( {
	host: 'localhost/learning-yeoman',
	models: {
		'pages': { title: String, slug: String, body: String, published: Boolean},
		'users': { username: String, password: String, email: String, active: Boolean}
	}
} );
//_db.connect( 'localhost/learning-yeoman' );

exports['DS'] = {
	setUp: function (done) {

		done();
	},
	'findAll': function (test) {
		test.expect( 1 );
		_ds.findAll( 'pages' ).then( function (data) {
			test.ok( (data instanceof Array), 'should return array.' );
			test.done();
		} );
	},
	'findOne': function (test) {
		test.expect( 1 );
		var id = '5361b9244f0ca7e16196c997';
		_ds.findOne( 'pages', id ).then( function (data) {
			test.ok( (data instanceof Object), 'should return object.' );
			test.done();
		} );
	}
};
