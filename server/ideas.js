const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('ideasId', (req, res, next, id) => {
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
    console.log(req.idea)
    res.send(req.idea)
})