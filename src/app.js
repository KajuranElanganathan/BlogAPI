const express = require("express");
const app = express();
app.use(express.json())
const prisma = require("./util/db")


const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("../src/routes/userRoutes")



app.use("/posts",postRoutes);
app.use(commentRoutes);
app.use('/users',userRoutes)

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

app.listen("3000",console.log("serv runnin"))

module.exports = app;


