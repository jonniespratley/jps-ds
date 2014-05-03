/*! ds - v0.0.1 - 2014-05-03
* https://github.com/jonniespratley/ds
* Copyright (c) 2014 Jonnie Spratley; Licensed MIT */
/* global require, console */
(function (exports) {

	'use strict';
	exports.DS = function (options) {

		var mongoose = require( "mongoose" );
		var Deferred = require( "promised-io/promise" ).Deferred;

		var instance = null;
		var models = {};
		var ds = {};

		ds.connect = function (host) {
			if (options.models) {
				for (var m in options.models) {
					if (m) {
						var model = mongoose.model( m, new mongoose.Schema( options.models[m] ) );
						models[m] = model;
					}
				}
			}
			instance = mongoose.connect( "mongodb://" + host );
			return this;
		};

		ds.model = function (name, schema) {
			return mongoose.model( name, new mongoose.Schema( schema ) );
		};

		ds.findAll = function (table) {
			var deferred = new Deferred();
			if (!models[table]) {
				throw new Error( 'Must add table to options.' );
			}

			models[table].find( function (err, m) {
				if (!err) {
					deferred.resolve( m );
				} else {
					deferred.reject( err );
				}
			} );
			return deferred.promise;
		};

		ds.findOne = function (table, id) {
			var deferred = new Deferred();
			if (!models[table]) {
				throw new Error( 'Must add table to options.' );
			}
			models[table].findById( id, function (err, m) {
				if (!err) {
					deferred.resolve( m );
				} else {
					deferred.reject( err );
				}
			} );
			return deferred.promise;
		};

		ds.create = function (table, data) {
			var deferred = new Deferred();
			if (!models[table]) {
				throw new Error( 'Must add table to options.' );
			}
			var model = new models[table]( data );
			model.save( function (err, m) {
				if (!err) {
					deferred.resolve( m );

				} else {
					deferred.reject( err );
				}
			} );
			return deferred.promise;
		};
		ds.update = function (table, id, data) {
			var deferred = new Deferred();
			models[table].findByIdAndUpdate( id, data, function (err, m) {
				if (!err) {
					deferred.resolve( m );
				} else {
					deferred.reject( err );
				}
			} );
			return deferred.promise;
		};

		ds.destroy = function (table, id) {
			var deferred = new Deferred();
			models[table].findByIdAndRemove( id, function (err, m) {
				if (!err) {
					deferred.resolve( m );
				} else {
					deferred.reject( err );
				}
			} );
			return deferred.promise;
		};

		if (options.host) {
			return ds.connect( options.host );
		} else {
			return ds;
		}
	};

}( typeof exports === 'object' && exports || this ));
