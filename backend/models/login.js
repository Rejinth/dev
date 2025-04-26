const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

LoginSchema.statics.authenticate = async function(email, password) {
    try {
        const user = await mongoose.model('userData').findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
        await this.updateOne({ email: email }, { lastLogin: new Date() });
        
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Login', LoginSchema);