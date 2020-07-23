const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if (idea) {
        req.idea = idea
        next()
    } else {
        res.status(404).send()
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    let toUpdate = updateInstanceInDatabase('ideas', req.body)
    res.send(toUpdate)
})

ideasRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDatabase('ideas', req.body))
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea.id)
    res.status(204).send()
})