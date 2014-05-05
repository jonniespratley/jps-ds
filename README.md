# DS

This is a simple MongoDB datasource module.

## Getting Started

### On the server
Install the module with: `npm install jps-ds`

```
var DS = require('jps-ds').DS;
```

#### connect

```
var _ds = new DS( {
	//host: 'localhost/learning-yeoman',
	host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
	models: {
		'pages': { title: String, body: String, published: Boolean, created: Date}
	}
} );
```

#### findAll

```
_ds.findAll('pages').then(function(data){
	pages = data;
	console.log(pages[0]._id);
});
```

#### findOne

#### create

```
_ds.create( 'pages', {
	title: 'Page ' + Date.now(),
	body: 'This is the page content.',
	published: true,
	created: new Date()
} ).then( function (page) {
	console.log( 'page created', page );
} );
```

#### update

```
_ds.update( 'pages', pages[0]._id, {title: 'updated title'} ).then( function (data) {
		console.log(data);
} );
```

#### destroy









### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jonniespratley/ds/master/dist/jps-ds.min.js
[max]: https://raw.github.com/jonniespratley/ds/master/dist/jps-ds.js

In your web page:

```html
<script src="dist/ds.min.js"></script>
<script>
ds(); // "data source"
</script>
```


## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
 
 Copyright (c) 2014 Jonnie Spratley. Licensed under the MIT license.
