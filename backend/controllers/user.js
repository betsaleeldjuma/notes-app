const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userCount = (req, res) => {
    res.json({data: 'hello'});
}

// Create User
const newCount =  async (req, res) => {
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "All input required"
            })
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                error: true,
                message: "User existing"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = new User ({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            {id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '2h'}
        )

        res.status(201).json({
            error: false,
            message: "Account created",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// Login
const login = (async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Email or password invalid"
            })
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                error: true,
                message: "Email or password incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                error: true,
                message: "Email or password incorrect"
            })
        }

        if(!process.env.ACCESS_TOKEN_SECRET) {
            console.error('ACCESS_TOKEN_SECRET is not defined')
            return res.status(500).json({ error: true, message: 'Server configuration error' })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '2h'}
        )

        res.status(200).json({
            error: false,
            message: "Connected...",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch(error) {
        console.error(error)
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}) 

// Get User
const getUser = async (req, res) => {
    try {
        const isUser = await User.findById(req.user.id);

        if(!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createOn: isUser.createOn
            },
            message: ""
        })
    } catch(error) {
        console.error(error)
        return res.status(500).json({ error: true, message: error.message })
    }
}

module.exports = {newCount, userCount, login, getUser}