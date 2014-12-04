//Require the DS module
var DS = require( '../src/jps-ds.js' ).DS;

//Create instance of the DS module
var _ds = new DS( {
	host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
  //host: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
	models: {
		'pages': { title: String, body: String, published: Boolean, created: Date}
	}
} );

//Store reference of a item.

var _page;

//Store reference of all items.
var _pages;

//Store reference of items id.
var _id;

//Exports object defines the test
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
	'create': function (test) {
		test.expect( 1 );
		_page = {
			title: 'Page ' + Date.now(),
			body: 'This is the page content.',
			published: true,
			created: new Date()
		};
		_ds.create( 'pages', _page ).then( function (data) {
			test.ok(data._id, 'should return object with id.' );
			test.done();
		} );
	},
	'update': function (test) {
		test.expect( 1 );
		_page = {
			title: 'Updated Page'
		};
		_ds.update( 'pages', _id, _page ).then( function (data) {
			test.equal( data.title, 'Updated Page', 'should have updated title.' );
			test.done();
		} );
	},
	'destroy': function (test) {
		test.expect( 1 );
		_ds.destroy( 'pages', _page._id ).then( function (data) {
			test.equal( data, true, 'should return object.' );
			test.done();
		} );
	},
	'no table': function (test) {
		test.expect( 1 );
		test.throws( function () {
			_ds.findAll( 'null-table' );
		}, Error, 'should throw Error if no table' );
		test.done();
	}
};
