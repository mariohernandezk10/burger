var connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";


// Update portion
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableName, cb) {

    var queryString = `SELECT * FROM ${tableName};`;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(tableName, columNames, vals, cb) {
    var queryString = `INSERT INTO ${tableName} (${columNames.toString()})
                       VALUES (?, ?)`;

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(tableName, objColVals, condition, cb) {
    var queryString = `UPDATE ${tableName}
                       SET ${objToSql(objColVals)}
                       WHERE ${condition}`;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(tableName, columnName, columnValue, cb) {
    var queryString = `DELETE FROM ??
                       WHERE ??=?`;

    connection.query(queryString, [tableName, columnName, columnValue], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  ormDeleteAsyncExample: async function(tableName, columnName, columnValue) {
    let SQL_STATEMENT = `DELETE FROM ?? 
                         WHERE ?? = ?`;

    try {
        const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [tableName, columnName, columnValue]);
        return rows;
    } catch (error) {
        console.log(error);
    }
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;