var DS = require( './src/jps-ds.js' ).DS;
var _ds = new DS( {
	//host: 'localhost/learning-yeoman',
	host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
	models: {
		'pages': { title: String, body: String, published: Boolean, created: Date}
	}
} );
var pages = [];
// _ds.create( 'pages', {
	// title: 'Page ' + Date.now(),
	// body: 'This is the page content.',
	// published: true,
	// created: new Date()
// } ).then( function (page) {
	// console.log( 'page created', page );
// } );



