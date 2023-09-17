const express = require("express");
const jwt = require("jsonwebtoken");
const Key = "secretkey"
// studentController.js

const Student = require("../../models/models.js").Student;

async function registerStudent(req, res) {
    const Ui = req.body.username;
    const pw = req.body.Password;
    console.log('Username:', Ui);
    console.log('Password:', pw);

    try {
        // Check if the student exists
        let student = await Student.findOne({ 'universityID': Ui });

        // If the student doesn't exist, create a new student
        if (!student) {
            student = new Student({
                'universityID': Ui,
                'Password': pw,
                'DeanId': "",
                'bookedSessions': []
            });
            await student.save();
        }

        // You can generate and send a token here if needed
        const t = jwt.sign({ student }, Key, { expiresIn: '300s' }, (err, token) => {
            res.status(2000).json({
                token
            })
        });
        console.log(t);
        res.status(200).json({ student, t });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = {
    registerStudent,

};
