const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  const key = Object.keys(req.body)?.[0]
  const value = req.body[key]
  if (!req.body || !value) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    key,
    value,
    timestamp: String((new Date()).getTime()),
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the object."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  console.log(typeof req.query.timestamp,'---')
  Tutorial.findByKeyAndTime({key: req.params.key, timestamp: req.query.timestamp}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with key ${req.params.key}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with key " + req.params.key
        });
      }
    } else res.send(data);
  });
};
  