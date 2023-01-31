const jwt =require('jsonwebtoken')
const jwtscret=process.env.JWT_SCRET
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt

    if (token) {
        jwt.verify(token,jwtscret,(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}
module.exports=requireAuth;