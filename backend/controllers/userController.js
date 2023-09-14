import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//User authentication / set token
//route POST/api/users/auth
//public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({
        email,
    })

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid email/password')
    }

    res.json(200).json({message: 'Authentincated user'})
})

//User Register a new user
//route POST/api/users
//public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExsists = await User.findOne({email})
    
    if(userExsists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//User Logout
//route POST/api/users/logout
//public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged out'})
})

//User Get user profile
//route POST/api/users/profile
//private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})


//User Update user profile
//route PUT /api/users/profile
//private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({message: 'Update user profile'})
})



export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}