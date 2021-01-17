// Import the ORM to create functions that will interact with the database.
const e = require("express");
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res); 
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function (columnName, columnValue, cb) {
    orm.delete("burgers", columnName, columnValue, function(res) {
      // No business logic
      cb(res);
    });
  },
  modelDeleteAsyncExample: async function (columnName, columnValue, cb) {


    const results = await orm.ormDeleteAsyncExample("burgers", columnName, columnValue);

    // Add business logic here, before we send back to controller.
    // This is a good place to add logic where the database cannot do for you.
    // e.g. What if we need to encrypt some data from the database? Or, add data to database, etc.

    return results;

  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;