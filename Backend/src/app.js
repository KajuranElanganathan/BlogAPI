const express = require("express");
const app = express();
app.use(express.json())
const prisma = require("./util/db")


const postRoutes = require("../src/routes/postRoutes")
const commentRoutes = require("../src/routes/commentRoutes");
const userRoutes = require("../src/routes/userRoutes")



app.use("/posts",postRoutes);
app.use("/",commentRoutes);
app.use('/user',userRoutes)

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

app.listen("3000",()=>console.log("Server running - port 3000"))

module.exports = app;


