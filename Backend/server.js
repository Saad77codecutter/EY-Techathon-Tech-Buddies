import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/Schemeroutes.js";  // Import your routes correctly

dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Use the imported router for handling requests
app.use(router); // No need to invoke router as a function

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
