const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting,
    deleteAllFromDatabase,
  } = require('./db');
/*
meetingsRouter.param('time', (req, res, next, time) => {
    const meeting = getFromDatabaseById('meetings', id)
    if (meeting) {
        req.meeting = meeting
        next()
    } else {
        res.status(404).send()
    }
})
*/
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
})

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))
})