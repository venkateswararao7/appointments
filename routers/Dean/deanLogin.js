const Dean = require("../../models/models.js").Dean;

async function deanLogin(req, res) {
    const ui = req.body.universityID;
    const pw = req.body.Password;
    console.log("university id :", ui);
    console.log("Password :", pw);
    try {
        let dean = await Dean.findOne({ 'universityID': ui });
        //dean is not present then adding into the database
        if (!dean) {
            dean = new Dean({
                'universityID': ui,
                'Password': pw,
                'friday': 1,
                'saturday': 1
            });
            await dean.save();
        }
        res.status(400).json({ "dean :": "register successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'login fails' })
    }
}

module.exports = {
    deanLogin
}