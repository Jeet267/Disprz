require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const initializeAdmin = require("./config/adminInit");
const adminRoutes = require("./Routes/admin");
const userRoutes = require("./Routes/user");

const app = express();

// Middleware
app.use(express.json());

// Connect to Database and Initialize Admin
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Initialize admin user
    await initializeAdmin();

    // Routes
    app.use("/api/admin", adminRoutes);
    app.use("/api/user", userRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send({ error: "Something went wrong!" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
