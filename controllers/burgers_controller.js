const express = require('express');
const router = express.Router();
var burger = require('../models/burger.js');


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    console.log(data);
    res.render("index", {burgers: data});
  });
});

router.post("/api/burgers", function(req, res) {

  burger.create(["burger_name", "devoured"], [req.body.name, req.body.eatenKey], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });

});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log("devoured value: " + req.body.eatenKey);
  burger.update({
    devoured: req.body.eatenKey
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


router.delete("/api/burgers/:id", async function(req, res) {
  
  let columnName = "id";
  let columnValue = req.params.id;

  const result = await burger.modelDeleteAsyncExample(columnName, columnValue);

  if (result.affectedRows == 0) {
    // If no rows were changed, then the ID must not exist, so 404
    return res.status(404).end();
  }

  res.status(200).end();
});

// Export routes for server.js to use.
module.exports = router;
