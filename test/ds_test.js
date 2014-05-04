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
	host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
	models: {
		'pages': { title: String, slug: String, body: String, published: Boolean}
	}
} );

//Store reference of item
var _page;
//Store reference of all items
var _pages;
//Store reference of id
var _id;

exports['DS'] = {
	setUp: function (done) {
		done();
	},

	'findAll': function (test) {
		test.expect( 1 );
		_ds.findAll( 'pages' ).then( function (data) {
			_pages = data;
			test.ok( (data instanceof Array), 'should return array.' );
			test.done();
		} );
	},
	'findOne': function (test) {
		test.expect( 1 );
		_id = _pages[0]._id;
		_ds.findOne( 'pages', _id ).then( function (data) {
			_page = data;
			test.ok( (data instanceof Object), 'should return object.' );
			test.done();
		} );
	},
	'create': function(test){
		test.expect(1);
		_page = {
			title: 'Page ' + Date.now(),
			body: 'This is the page content.',
			published: true,
			created: new Date()
		};
		_ds.create( 'pages', _page ).then( function (data) {
			_page = data;
			test.ok( (_page instanceof Object), 'should return object.' );
			test.done();
		} );
	},
	'update': function(test){
		test.expect(1);
		_page = {
			title: 'Updated Page'
		};
		_ds.update( 'pages', _id, _page ).then( function (data) {
			test.equals( data.title, 'Updated Page', 'should have updated title.' );
			test.done();
		} );
	},
	'destroy': function(test){
		test.expect(1);
		_ds.destroy( 'pages', _page._id ).then( function (data) {
			test.equal( data, true, 'should return object.' );
			test.done();
		} );
	},
    'no table': function(test){
        test.expect(1);
        test.throws(function(){
            _ds.findAll( 'null-table' );
        }, Error, 'should throw Error if no table');
        test.done();

    }
};
