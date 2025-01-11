const User = require("../models/User");
const bcrypt = require("bcryptjs");

const initializeAdmin = async () => {
  try {
    
    const adminExists = await User.findOne({ userId: "admin123" });

    if (!adminExists) {
      // Create new admin user
      const adminUser = new User({
        userId: "admin123",
        password: "admin123", // This will be hashed by the model's pre-save middleware
        isAdmin: true,
      });

      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = initializeAdmin;
