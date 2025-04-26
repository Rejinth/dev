const mongoose = require('mongoose');

const VaccForm = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    vaccineName: {
        type: String,
        required: true,
        enum: ['COVID-19', 'Influenza', 'Hepatitis B', 'MMR', 'Other']
    },
    appointmentDate: {
        type: Date,
        required: true,
        min: Date.now
    },
    sideEffects: [{
        type: String,
        enum: ['Fever', 'alurgy', 'Pain', 'Fatigue', 'Headache', 'None', 'Other']
    }],
    status: {
        type: String,
        required: true,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Missed'],
        default: 'Scheduled'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('VaccForm', VaccForm);