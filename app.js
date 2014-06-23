var DS = require( './src/jps-ds.js' ).DS;
var _ds = new DS( {
	host: 'localhost/learning-yeoman',
	//host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
	models: {
		'pages': { title: String, body: String, published: Boolean, created: Date}
	}
} );


var pages = [];


//Create new page
_ds.create( 'pages', {
	title: 'Page ' + Date.now(),
	body: 'This is the page content.',
	published: true,
	created: new Date()
} ).then( function (page) {

	console.log( 'Page created', page._id );
} );


//Find all pages
_ds.findAll('pages').then(function(data){
	pages = data;
	console.log( 'First page ID', pages[0]._id);

    //Update the first page found
	_ds.update( 'pages', pages[0]._id, {title: 'updated title'} ).then( function (data) {
		console.log( 'Page updated', data);
	} );
});

