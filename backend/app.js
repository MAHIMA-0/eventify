const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');

const app = express();



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'event-management',
});


app.use(express.json());
app.use(session({
  secret: '12',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods:['GET','POST','DELETE']
}));



app.get('/',(req,res)=>{
res.send('THIS IS BACKEND');

});
// Register
app.post('/api/Register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  db.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Hashing error' });

      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) return res.status(500).json({ message: 'DB insert error' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

// Login
app.post('/api/Login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ message: 'Compare error' });
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      req.session.user_id = user.id;
      req.session.username = user.username;
      res.json({ message: 'Login successful', username: user.username });
    });
  });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.json({ message: 'Logged out successfully' });
  });
});

app.get('/api/events', (req, res) => {
  if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });

  db.query('SELECT id, name, date, location FROM events WHERE user_id = ?', [req.session.user_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json({ events: results });
  });
});


app.post('/api/AddEvent', (req, res) => {
  if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });

  const { name, date, location } = req.body;
  if (!name || !date) return res.status(400).json({ message: 'Name and date required' });

  db.query(
    'INSERT INTO events (name, date, location, user_id) VALUES (?, ?, ?, ?)',
    [name, date, location, req.session.user_id],
    (err) => {
      if (err) {
        console.error('DB Insert Error:', err);
        return res.status(500).json({ message: 'DB insert error' });
      }
      res.status(201).json({ message: 'Event added successfully' });
    }
  );
});

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM events WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Delete failed:', err);
      return res.status(500).send('Error deleting item');
    }

    res.send('Item deleted');
  });
});

  




app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

