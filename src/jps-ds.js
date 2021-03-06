/*
 * DS
 * https://github.com/jonniespratley/ds
 *
 * Copyright (c) 2014 Jonnie Spratley
 * Licensed under the MIT license.
 *
 * This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
 */
/* global require, console */
(function (exports) {

  'use strict';
  var DS = function (options) {

    var mongoose = require("mongoose");
    var Q = require('q');

    /**
     * I handle creating a new Deferred object.
     */
    var createDeferred = function () {
      return Q.defer();
    };

    /**
     * I am the instance of the ds connection.
     * @type {null}
     */
    var instance = null;

    /**
     * I hold a reference to all the models created.
     * @type {{}}
     */
    var models = {};

    /**
     * I am the reference to the ds object.
     * @type {{}}
     */
    var ds = {};

    /**
     * I handle connecting to the data source.
     * @param host
     * @returns {ds}
     */
    ds.connect = function () {
      if (options.models) {
        for (var m in options.models) {
          if (m) {
            var model = mongoose.model(m, new mongoose.Schema(options.models[m]));
            models[m] = model;
          }
        }
      }

      //Make a singleton
      instance = mongoose.connect("mongodb://" + options.host);

      return this;
    };

    this.getInstance = function () {
      if (!instance) {
        return ds.connect();
      } else {
        return instance;
      }
    };

    /**
     * I handle creating a new model.
     * @param name
     * @param schema
     * @returns {*}
     */
    ds.model = function (name, schema) {
      return mongoose.model(name, new mongoose.Schema(schema));
    };

    ds.getModel = function (name) {
      return models[name];
    };

    /**
     * I handle finding all documents.
     * @param table
     * @returns {Deferred.promise|*}
     */
    ds.findAll = function (table, params) {
      var deferred = createDeferred();
      if (!params) {
        params = null;
      }
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }

      models[table].find(params, function (err, m) {
        if (!err) {
          deferred.resolve(m);
        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };

    /**
     * I handle finding one document.
     * @param table
     * @param id
     * @returns {Deferred.promise|*}
     */
    ds.findById = function (table, id) {
      var deferred = createDeferred();
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }
      models[table].findById(id, function (err, m) {
        if (!err) {
          deferred.resolve(m);
        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };

    /**
     * I handle finding one document.
     * @param table
     * @param id
     * @returns {Deferred.promise|*}
     */
    ds.findOne = function (table, options) {
      var deferred = createDeferred();
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }
      models[table].findOne(options, function (err, m) {
        if (!err) {
          deferred.resolve(m);
        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };
    /**
     * I handle creating a new document.
     * @param table
     * @param data
     * @returns {Deferred.promise|*}
     */
    ds.create = function (table, data) {
      var deferred = createDeferred();
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }
      if (data._id) {
        delete data._id;
      }
      var model = new models[table](data);
      model.save(function (err, m) {
        if (!err) {
          deferred.resolve(m);

        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };

    /**
     * I handle updating an existing document.
     * @param table
     * @param id
     * @param data
     * @returns {Deferred.promise|*}
     */
    ds.update = function (table, id, data) {
      var deferred = createDeferred();
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }
      if (data._id) {
        delete data._id;
      }
      models[table].findByIdAndUpdate(id, data, function (err, m) {
        if (!err) {
          deferred.resolve(m);
        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };

    /**
     * I handle destroying a document.
     * @param table
     * @param id
     * @returns {Deferred.promise|*}
     */
    ds.destroy = function (table, id) {
      var deferred = createDeferred();
      models[table].findByIdAndRemove(id, function (err, m) {
        if (!err) {
          deferred.resolve(true);
        } else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };

    /**
     * I handle calling a method on the model instance
     * by using the call(name, args) method.
     * @param table
     * @param query
     * @param args
     */
    ds.execute = function (name, table, args) {
      if (!models[table]) {
        throw new Error('Must add table to options.');
      }
      var model = models[table];
      var deferred = Q.defer();
      console.log('calling on', table, name, args);

      return deferred.resolve(model.call(name, args));
    };

    if (options.host) {
      return ds.connect();
    } else {
      return ds;
    }
  };

  exports.DS = DS;

}(typeof module.exports === 'object' && module.exports || this));
