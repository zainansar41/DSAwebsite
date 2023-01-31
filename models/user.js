const mongoose=require('mongoose')
const {email}=require('validator')
const { default: isEmail } = require('validator/lib/isEmail')
const bcrypt=require('bcrypt')
const data=require("../db/database.js")
const userModel= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:[true, 'please enter email'],
        unique:true,
        lowercase:true,
        validate: [isEmail,"plz enter valid email"]
    },
    password:{
        type:String,
        required:[true,"plz eneter the password"],
        minlength:[6,"min password length must be 6"]
    }
})
userModel.post('save',(doc,next)=>{
    next();
})
userModel.pre('save',async function (next) {
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userModel.statics.login= async function(email,password){
    const user = await this.findOne({email});
    if (user) {
       const auth= await bcrypt.compare(password,user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports= data.model('user',userModel)