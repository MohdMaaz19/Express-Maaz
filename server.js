import express from "express";
import cors from "cors";
import db from "./app/models/db.js"
import tutorialRoutes from './app/routes/tutorial.routes.js';

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application." });
});

// Health-check route to test database connection
app.get("/health", (req, res) => {
  console.log("Health check route accessed");
  db.query("SELECT 1", (error, results) => {
    if (error) {
      console.error("Database connection error:", error);
      return res.status(500).json({ message: "Database connection failed." });
    }
    res.status(200).json({ message: "Database connected successfully." });
  });
});

// Tutorial routes
tutorialRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
