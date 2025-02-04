const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); 
    } else {
        console.log("Connected to MySQL database.");
    }
});

app.get("/api/users", (req, res) => {
    const query = "SELECT * FROM users"; 
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching campaign data:", err.message);
            res.status(500).json({ error: "Failed to fetch campaign data" });
            return;
        }
        res.json(results);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
