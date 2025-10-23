import express from "express";
import pool from "../db.js";

const router = express.Router();

await pool.query(`
  CREATE TABLE IF NOT EXISTS bets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    match_name STRING,
    outcome STRING,
    odds DECIMAL,
    amount DECIMAL,
    created_at TIMESTAMP DEFAULT now()
  )
`);

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query("SELECT * FROM bets WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    const { userId, matchName, outcome, odds, amount } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO bets (user_id, match_name, outcome, odds, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, matchName, outcome, odds, amount]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
