const cors = require("cors");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");
const dealerRoutes = require("./routes/dealer");
const uploadRoutes = require('./routes/upload');
const adminRoutes = require('./routes/admin');

const app = express();

// Increase payload size limits
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Enable CORS with specific origin
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dealer",dealerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin",adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
