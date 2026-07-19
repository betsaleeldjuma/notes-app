const User = require("../models/User");
const jwt = require('jsonwebtoken')

const userCount = (req, res) => {
    res.json({data: 'hello'});
}

const newCount = ( async (req, res) => {

    const {fullName, email, password} = req.body;

    if(!fullName) {
        return res
            .status(400)
            .json({ error: true, message: 'Full Name is required' })
    }

    if(!email) {
        return res.status(400).json({ error: true, message: 'Email is required'});
    }

    if(!password) {
        return res
            .status(400)
            .json({error: true, message: 'Password is required'})
    }

    const isUser = await User.findOne({email: email});

    if(isUser) {
        return res.json({
            error: true,
            message: 'User already exist'
        })
    }

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })
})

module.exports = {newCount, userCount}