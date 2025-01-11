const cors = require("cors");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");
const dealerRoutes = require("./routes/dealer");
const uploadRoutes = require("./routes/upload");
const adminRoutes = require("./routes/admin");

const app = express();

// Increase payload size limits
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//configure CORS
const corsOptions = {
  origin: "https://finance-app-aaaa-f2025.vercel.app",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
// Enable CORS with specific origin
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/dealer", dealerRoutes);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => res.send("API is running..."));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
