import express from 'express';
import * as tutorials from '../controllers/tutorial.controller.js';

export default (app) => {
  const router = express.Router();

  // Create a new Tutorial
  router.post('/', tutorials.create);

  // Retrieve all Tutorials
  router.get('/', tutorials.findAll);

  // Retrieve all published Tutorials
  router.get('/published', tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', tutorials.findOne);

  // Update a Tutorial with id
  router.patch('/:id', tutorials.update);

  // Delete a Tutorial with id
  router.delete('/:id', tutorials.deleteTutorial);

  // Delete all Tutorials
  router.delete('/', tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
