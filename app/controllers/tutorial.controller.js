import Tutorial from "../models/tutorial.model.js";

// Create and Save a new Tutorial
export const create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    } else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
export const findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    } else res.send(data);
  });
};

// Find all published Tutorials
export const findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    } else res.send(data);
  });
};

// Find a single Tutorial by ID
export const findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Tutorial with id ${req.params.id}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Tutorial identified by the ID in the request
export const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // First, fetch the current tutorial data
  Tutorial.findById(req.params.id, (err, currentData) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Tutorial with id ${req.params.id}`,
        });
      }
    } else {
      // Merge new data with existing data
      const updatedData = {
        title: req.body.title || currentData.title,
        description: req.body.description || currentData.description,
        published:
          req.body.published !== undefined
            ? req.body.published
            : currentData.published,
      };

      // Perform the update with merged data
      Tutorial.updateById(req.params.id, updatedData, (updateErr, data) => {
        if (updateErr) {
          if (updateErr.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: `Error updating Tutorial with id ${req.params.id}`,
            });
          }
        } else res.send(data);
      });
    }
  });
};

// Delete a Tutorial by ID
export const deleteTutorial = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Tutorial with id ${req.params.id}`,
        });
      }
    } else res.send({ message: "Tutorial was deleted successfully!" });
  });
};

// Delete all Tutorials from the database
export const deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    } else res.send({ message: "All Tutorials were deleted successfully!" });
  });
};
