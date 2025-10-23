import express from 'express';
import jwt from 'jsonwebtoken';
import pool from "../db.js";

const router = express.Router();

router.get("/init", async (req, res) => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name STRING,
        password STRING,
        balance DECIMAL DEFAULT 0
      )
    `);
        res.send("Table initialized");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE name = $1 AND password = $2", [name, password]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const user = result.rows[0];
        user.password = undefined;

        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json({ token, user: { id: user.id, name: user.name, balance: user.balance } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
export default router;