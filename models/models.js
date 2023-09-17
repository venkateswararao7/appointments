const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/DeanAppointments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//mongoose schema defining

const studentSchema = new mongoose.Schema({
    universityID: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,

    },
    token: {
        type: String,
        default: null,
    },
    DeanId: {
        deanId: String,

    }
});

const deanSchema = new mongoose.Schema({
    universityID: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    friday: {
        type: Boolean,
        default: true
    },
    saturday: {
        type: Boolean,
        default: true
    }

});

const Student = mongoose.model('Student', studentSchema);
const Dean = mongoose.model('Dean', deanSchema);
module.exports = {
    Student,
    Dean,
};