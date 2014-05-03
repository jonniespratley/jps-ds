var DS = require( './src/ds.js' ).DS;
var _ds = new DS( {
	host: 'localhost/learning-yeoman',
	models: {
		'pages': { title: String, slug: String, body: String, published: Boolean},
		'users': { username: String, password: String, email: String, active: Boolean}
	}
} );

_ds.findAll( 'pages' ).then( function (data) {
	console.log( data );
} );

_ds.create( 'pages', {
	title: 'New pages',
	body: 'This is the body of the pages.',
	created: new Date()
} ).then( function (page) {

	console.log( 'pages created', page );

	_ds.destroy( 'pages', page ).then( function (data) {
		console.log( 'pages delete', data );
	} );

} );