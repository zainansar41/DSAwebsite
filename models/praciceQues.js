const mongoose=require('mongoose')
const data=require("../db/database.js")
const practiceModel= new mongoose.Schema({
    topic:{
        type:String,
        lowercase:true
    },
    question:{
        type:String
    },
    answer:{
        type:String
    },
    tags:{
        type:Array
    }
})

module.exports= data.model('practice',practiceModel)