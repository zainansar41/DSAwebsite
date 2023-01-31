const mongoose=require('mongoose')
const data=require("../db/database.js")
const msgSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    question:{
        type:String
    }
})

module.exports= data.model('query',msgSchema)