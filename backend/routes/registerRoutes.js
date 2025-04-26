const router = require('express').Router();
const User = require('../models/registration');

router.post('/register', async (req, res) => {
    try {
        console.log("req.body",req.body)
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "Registration successful",
            user: {
                name: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;