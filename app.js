var DS = require( './src/jps-ds.js' ).DS;
var _ds = new DS( {
	//host: 'localhost/learning-yeoman',
	host: 'angularcms:angularcms@paulo.mongohq.com:10089/app19632340',
	models: {
		'posts': { title: String, body: String, published: Boolean, created: Date}
	}
} );
var pages = [];

 _ds.create( 'posts', {
	 title: 'post ' + Date.now(),
	 body: 'This is the post content.',
	 published: true,
	 created: new Date()
 } ).then( function (page) {
	 console.log( 'post created', page );


 } );
_ds.findAll('posts').then(function(data){
console.log(data);
});
