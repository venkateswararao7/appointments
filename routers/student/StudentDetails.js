const Student = require("../../models/models.js").Student;

async function studentDetail(req, res) {
    const totalStudents = await Student.find({});
    res.status(200).json(totalStudents);
}

module.exports = {
    studentDetail
}