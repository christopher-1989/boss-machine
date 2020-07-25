const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting,
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
    console.log(req)
    res.send(getAllFromDatabase('meetings'))
})
