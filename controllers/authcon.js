const jwt=require('jsonwebtoken');
const user = require('../models/user.js');
const jwtscret=process.env.JWT_SCRET

const handleError=(err)=>{
    console.log(err.message, err.code);
    let error={email:'',password:''}
    if (err.message==="incorrect email") {
        error.email="that email is not registered"
    }
    if (err.message==="incorrect password") {
        error.password="password is incorrect"
    }

    if(err.code===11000){
        error.email='that email is already registered'
    }
    if(err.message.includes('user validation failed')){
        // (err.errors.values);  we need this
       Object.values(err.errors).forEach(({properties})=>{
        console.log(properties);
        error[properties.path]=properties.message
       })
    }
    return error
}

const maxAge=365*24*60*60;

const createToken=(id)=>{
    return jwt.sign({id }, jwtscret ,{
        expiresIn:maxAge
    })
}


// ROUTES

module.exports.sinup_get=(req,res)=>{
    res.render('loginsinup')
}
module.exports.login_get=(req,res)=>{
    res.render('loginSinup')
}
module.exports.sinup_post=async (req,res)=>{

    try {
        const {name,email,password}=req.body
        console.log(name);
        let doc= new user({
            name:name,
            email:email,
            password:password
        })
        let result = await doc.save();
        const token=createToken(result._id)
        res.cookie('jwt',token,{maxAge:maxAge*1000})
        res.json({user:result._id})
    } catch (err) {
       const error=  handleError(err)
       res.json({error})

    }
}
module.exports.login_post=async (req,res)=>{
    try {
        const {email,password}=req.body
        const User= await user.login(email,password)
        const token=createToken(User._id)
        res.cookie('jwt',token,{maxAge:maxAge*1000})
        res.json({user:User._id})
    } catch (error) {
        const errors = handleError(error)
        res.json({errors})
    }
}
module.exports.logout_get=async (req,res)=>{
    try {
        res.clearCookie('jwt')
        res.redirect('/')
    } catch (error) {
        
    }
}