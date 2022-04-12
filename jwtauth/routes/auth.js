const router = require('express').Router()
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
router.post("/register",[check("email","Invalid Email").isEmail(),check("password","Password Short").isLength({min:6})],async(req,res)=>{
	const {password,email,name} = req.body;
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		})
	}
	const pass = await bcrypt.hash(password,10)
	await User.create({
		name:name,
		email:email,
		password:pass
	})
	res.status(200).json({
		status:'ok'
	})
})
module.exports = router
