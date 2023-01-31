const mongoose= require('mongoose')
const URI=process.env.DB_uri
const data=mongoose.createConnection(URI)

module.exports=data