const router = require('express').Router();
const Login = require('../models/login');

router.post('/login', async (req, res) => {
    try {
        console.log('req.body',req.body)
        const { email, password } = req.body;
        console.log(" email, password ", email, password )
        const user = await Login.authenticate(email, password);
        console.log("user",user)
        res.status(200).json({ 
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;