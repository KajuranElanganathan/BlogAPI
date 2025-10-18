const express = require("express");
const app = express();

const prisma = require("./util/db");
const cors = require("cors");


console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://blog-api-kajuranelanganathans-projects.vercel.app",

  
   // Vercel frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"), false);
    }
  },
  credentials: true // allow cookies/auth if needed
}));

app.use(express.json());

const postRoutes = require("../src/routes/postRoutes");
const commentRoutes = require("../src/routes/commentRoutes");
const userRoutes = require("../src/routes/userRoutes");
const postSpecialRoutes = require("../src/routes/userRoutesSpecial");

app.use("/posts", postRoutes);
app.use("/", commentRoutes);
app.use("/user", userRoutes);
app.use("/admin", postSpecialRoutes);

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

const startServer = async () => {
  try {
    await prisma.$connect(); // optional but good to test DB connection
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
