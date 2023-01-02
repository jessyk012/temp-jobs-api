const UserDB = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors')

// Register Controller
const httpRegister = async (req, res) => {
    
    const user = await UserDB.create({...req.body})
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
}



// Login Controller

const httpLogin = async (req, res) => {

    const {email, password} = req.body;

    
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await UserDB.findOne({email})

    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})

}


// Export Functions 

module.exports = {
    httpRegister,
    httpLogin
}