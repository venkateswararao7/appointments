const Student = require("../../models/models.js").Student;
const Dean = require("../../models/models.js").Dean;

async function appointmentsShedule(req, res) {
    {
        try {
            // Assuming you have studentId and selectedDeanId in the request body
            const studentId = req.body.universityID;
            const selectedDeanId = req.body.universityDeanID;

            // Validate if both studentId and selectedDeanId are provided
            if (!studentId || !selectedDeanId) {
                return res.status(400).json({ error: "Both studentId and selectedDeanId are required." });
            }

            // Check if the student exists
            const student = await Student.findOne({ universityID: studentId });
            if (!student) {
                return res.status(404).json({ error: "Student not found." });
            }

            // Check if the selected dean exists and has either friday or saturday availability
            const selectedDean = await Dean.findOne({
                universityID: selectedDeanId,
                $or: [
                    { friday: true },
                    { saturday: true }
                ]
            });
            console.log('Hello');
            if (!selectedDean) {
                return res.status(404).json({ error: "Selected dean not found or does not have Friday or Saturday availability." });
            }

            // Update the student's document to reference the selected dean
            student.DeanId = selectedDean;
            await student.save();
            if (selectedDean.friday) {
                selectedDean.friday = false;
            }
            else {
                selectedDean.saturday = false;
            }
            await selectedDean.save();

            res.status(200).json({ message: "Appointment scheduled successfully." });
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "An error occurred while scheduling the appointment." });
        }
    }
}

module.exports = {
    appointmentsShedule
}