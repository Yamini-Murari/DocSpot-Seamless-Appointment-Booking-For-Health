require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI); // ✅ for debug
connectToDB();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

// Routes
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}'); // ✅ fixed with backticks
});