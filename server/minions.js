const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
  res.status(201).send(addToDatabase('minions', req.body))
})

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion)
})

minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase('minions', req.body)
  res.send(updatedMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minion.id)
  res.status(204).send()
})