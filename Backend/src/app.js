const express = require("express");
const app = express();

const prisma = require("./util/db")
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // if you use cookies/auth
}));

app.use(express.json())
const postRoutes = require("../src/routes/postRoutes")
const commentRoutes = require("../src/routes/commentRoutes");
const userRoutes = require("../src/routes/userRoutes")
const postSpecialRoutes = require("../src/routes/userRoutesSpecial")



app.use("/posts",postRoutes);
app.use("/",commentRoutes);
app.use('/user',userRoutes)
app.use("/admin",postSpecialRoutes)




app.get("/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

app.listen("3000",()=>console.log("Server running - port 3000"))

module.exports = app;


