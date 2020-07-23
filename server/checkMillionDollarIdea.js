const checkMillionDollarIdea = (res, req, next) => {
    const { numWeeks, weeklyRevenue } = req.body
    const totalYield = Number(numWeeks) * Number(weeklyRevenue)
    if (totalYield < 1000000) {
        res.status(400).send()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
