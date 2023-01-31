const express=require('express')
const app= express();
const cookieParser=require('cookie-parser')
require('dotenv').config()

const router=require('./routes/web.js')
require("./db/database.js")
const port=process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set('view engine','ejs')
// app.use(express.static(join(process.cwd(),'public'))) 
app.use(express.static('public'));
app.use("/viewCon/",express.static('public'));


app.use('/',router)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})