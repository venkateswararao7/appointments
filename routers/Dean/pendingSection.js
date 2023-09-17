const Dean = require("../../models/models.js").Dean;
const Student = require("../../models/models.js").Student;

async function PendingSection(req, res) {
    try {
        const deans = await Dean.find({
            $or: [
                { friday: false },
                { saturday: false }
            ]
        });
        res.status(200).json({ deans });
        if (!deans) {
            res.status(200).json({ "error": "No pending sections " });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    PendingSection
}