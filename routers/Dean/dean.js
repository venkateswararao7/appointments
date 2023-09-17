const Dean = require("../../models/models.js").Dean;

async function deanDetails(req, res) {
    const totalDean = await Dean.find({

    });
    //if no dean is present handle 
    res.status(200).json(totalDean);
}

module.exports = {
    deanDetails,

}