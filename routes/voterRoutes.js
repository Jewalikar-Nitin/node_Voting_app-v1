const express= require('express');
const router = express.Router();
const voter = require('../models/voterModel');
const controller= require('../controller/voterController')
const {jwtAuthMiddleware}=require('../jwt');

router.post('/signup',controller.signUp);
router.post('/login',jwtAuthMiddleware,controller.login)

module.exports= router;