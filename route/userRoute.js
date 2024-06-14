const express = require('express');
const userRoute = express.Router();

const userController = require('../controller/userController')


userRoute.post('/signIn',userController.signIn)
userRoute.post('/googleAuth',userController.googleAuth)

module.exports = userRoute