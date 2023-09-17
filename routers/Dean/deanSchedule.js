const Dean = require("../../models/models.js").Dean;

async function deanSchedule(req, res) {
    try {
        const deans = await Dean.find({
            $or: [
                { friday: true },
                { saturday: true }
            ]
        });

        // Check if any deans were found
        if (deans.length === 0) {
            return res.status(404).json({ message: "No deans with friday or saturday availability found." });
        }

        res.status(200).json(deans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while retrieving dean data." });
    }
}

module.exports = {
    deanSchedule
}