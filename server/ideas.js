const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea')

ideasRouter.param('id', (req, res, next, id) => {
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

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)
})

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let toUpdate = updateInstanceInDatabase('ideas', req.body)
    res.send(toUpdate)
})

ideasRouter.delete('/:id', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea.id)
    res.status(204).send()
})