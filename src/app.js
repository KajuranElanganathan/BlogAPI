const express = require("express");
const app = express();
app.use(express.json())
const prisma = require("./util.js/db")


const postRoutes = require("./routes/postRoutes")


app.use("/posts",postRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

app.listen("3000",console.log("ser runnin"))