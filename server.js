require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Submit form route
app.post("/submit", async (req, res) => {
  try {
    const { first_name, last_name, age, phone, email } = req.body;

    const query = `
      INSERT INTO users (first_name, last_name, age, phone, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      first_name,
      last_name,
      age,
      phone,
      email,
    ]);

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// View all submissions
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
