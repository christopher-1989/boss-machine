const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
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

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((individualWork) => {
    return individualWork.minionId === req.params.minionId
  })
  res.send(work)
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body
  res.status(201).send(addToDatabase('work', newWork))
})

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id)
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send
  }
  const updatedWork = updateInstanceInDatabase('work', req.body)
  res.send(updatedWork)
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  deleteFromDatabasebyId('work', req.work.id)
  res.status(204).send()
})