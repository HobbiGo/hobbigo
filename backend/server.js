const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "HobbiGo Backend",
    version: "1.0.0",
    status: "ONLINE"
  });
});

// HEALTH CHECK
app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    service: "HobbiGo API",
    database: "SUPABASE READY",
    status: "ONLINE"
  });
});

// PRODUCTS
app.get("/api/v1/products", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "HobbiGo products API ready"
  });
});

// TRIPS
app.get("/api/v1/trips", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "HobbiGo trips API ready"
  });
});

// BOOKINGS
app.get("/api/v1/bookings", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "HobbiGo bookings API ready"
  });
});

// PAYMENTS
app.get("/api/v1/payments", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "HobbiGo payments API ready"
  });
});

// PARTNERS
app.get("/api/v1/partners", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "HobbiGo partners API ready"
  });
});

// SERVER
app.listen(PORT, () => {
  console.log(`HobbiGo Backend running on port ${PORT}`);
});