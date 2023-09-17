const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();
const port = 3000;

// Use bodyParser.urlencoded to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

//import the modules
const studentLogin = require("./routers/student/studentLogin.js");
const studentDetails = require("./routers/student/StudentDetails.js");
const appointment = require("./routers/student/StudentAppointment.js");

//dean function importing
const DeanInfo = require("./routers/Dean/dean.js");
const deanlogin = require("./routers/Dean/deanLogin.js");
const Deanschedule = require("./routers/Dean/deanSchedule.js");
const DeansPendingSection = require("./routers/Dean/pendingSection.js");

//student registration or student login 
app.post('/student/login', studentLogin.registerStudent);
//getting the total students from Student database 
app.get("/students", studentDetails.studentDetail);
//student schedules
app.post("/student/appointmentSchedule", appointment.appointmentsShedule);


//dean registration or dean login
app.post("/dean/login", deanlogin.deanLogin);
//getting the total deans from Dean database
app.get("/dean", DeanInfo.deanDetails);
//student scheduling the appointments of dean
app.get("/dean/schedule", Deanschedule.deanSchedule);
//displaying the pending sections
app.get("/dean/pendingSection", DeansPendingSection.PendingSection);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
