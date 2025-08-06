require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// SQL Injection vulnerability example (GET endpoint)
app.get('/api/user', async (req, res) => {
  const { name } = req.query;
  try {
    // Vulnerable: user input directly in SQL
    const sql = `SELECT * FROM users WHERE name = '${name}'`;
    const [rows] = await db.query(sql);
    res.send(rows);
  } catch (err) {
    res.status(500).send({ error: 'Database error', details: err.message });
  }
});

// Intentionally insecure endpoint for demonstration
app.post('/api/submit', async (req, res) => {
  const { name, email, phone } = req.body;
  // No input validation (problem)
  try {
    // SQL Injection vulnerability (problem)
    const sql = `INSERT INTO users (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`;
    await db.query(sql); // Not using parameterized queries
    // Deprecated API usage (problem)
    res.send({ success: true });
    // Console.log left in production (problem)
    console.log('User submitted:', name, email, phone);
    // Use of eval (security risk)
    eval("console.log('Eval is dangerous!')");
    // Unhandled promise (problem)
    db.query('SELECT SLEEP(1)');
    // Magic number (problem)
    if (name.length > 7) {
      res.send({ warning: 'Name is too long!' });
    }
    // Commented-out code (problem)
    // db.query('DROP TABLE users');
  } catch (err) {
    res.status(500).send({ error: 'Database error', details: err.message });
  }
});

// Unused variable (problem)
const unused = 42;

// Function with too many parameters (problem)
function tooManyParams(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}

// Duplicate code (problem)
function duplicate1() {
  return 'duplicate';
}
function duplicate2() {
  return 'duplicate';
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
