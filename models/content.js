const mongoose=require("mongoose")
const data=require("../db/database.js")
const contentSchema= new mongoose.Schema({

    topicName:{
        type:String,
        lowercase:true
    },
    paragraphs:{
        type:Array
    },
    imageUrlArray:{
        type:Array
    },
    code:{
        type:String
    },
    tags:{
        type:Array
    }
})

const DSmodel=data.model('DSmodel',contentSchema)
const Sortingmodel=data.model('Sortingmodel',contentSchema)
const Algomodel=data.model('Algomodel',contentSchema)

module.exports={DSmodel,Sortingmodel,Algomodel}
