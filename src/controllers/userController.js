const prisma = require("../util/db")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
require('dotenv').config();


async function getMe (req,res){

try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }

}


async function register(req,res){


 const {email,username,password} = req.body;

 if (!email || !password) {

    return res.status(400).json("Must enter in an email or password")

 }

 if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }


  try {


    const existing = await prisma.user.findUnique({where:{email}})

    if(existing){
        
        return res.status(400).json({error:"email already exists"})};





    const passwordHash = await bcrypt.hash(password,10)

    const user = await prisma.user.create({

        data:{email,username,passwordHash}


    })
    res.status(201).json({ id: user.id, email: user.email, username: user.username });

  }catch(err){

    console.log(err)
    res.status(500).json({error:"registration failed"})
  }





}

async function login(req,res){

 const {email,password} = req.body;

if (!email || !password){return res.status(400).json({error:"need an email and password"})}


try{


    const user = await prisma.user.findUnique({where:{email}});

    if(!user){

        return res.status(401).json({error:"invalid username or password"});

    }

    const valid = await bcrypt.compare(password,user.passwordHash)


    if(!valid){ return res.status(401).json({error:"invaid username or password"})}


    const token = jwt.sign(

        {id:user.id,role: user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}



    );
    res.json({token})

    
}catch(err){
    console.log(err)
    res.status(500).json({error:"failed to login"});








}}

module.exports = {getMe,register,login}



