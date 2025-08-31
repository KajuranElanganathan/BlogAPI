const jwt = require("jsonwebtoken")
require('dotenv').config();

const key = process.env.JWT_SECRET

function authenticate(req,res,next){

    //finds if a header was sent with the request with the property of authorization, qmark used for if undefined dont throw an error return undefined, and "" fall back value
    const authHeader = req.headers?.authorization || "";
    const parts = authHeader.split(" ");
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null; //if the header contains two words and the first is bearer, then the token is the 2nd word else null




    if (!token){

        return res.status(401).json({error:'fail'})



    }

    if (!key){

        return res.status(500).json({error:'fail'})



    }

    try {


        const decoded = jwt.verify(token,key) //returns the payload, decoded obj


        req.user = {id:decoded.id,role:decoded.role}
        next();



    }catch(err){

        res.status(401).json({error:'invalid or expired toke' })

    }





}
//...roles means it can accept multiple values
function requireRole(...roles){

    return (req,res,next)=>{

        if (!req.user) return res.status(401).json({ error: "Unauthenticated" }); 

        if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" }); //checks if roles array include the value of req.user.role. roles = ["admin"], etc 
        }

        next();





    }



}

module.export = {authenticate,requireRole}