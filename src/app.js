const express = require('express');
const { login } = require('./auth');
const { runQuery } = require('./database');

const app = express();
app.use(express.json());

const API_KEY = 'super-secret-key-12345';
const DB_PASSWORD = 'admin123';

app.get('/', (req, res) => {
  console.log('Home route hit');

  if (req.query.name == 'admin') {
    eval('console.log("Hello admin")');
  }

  res.send('Hello World');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Login attempt: ${username}/${password}`);

  const user = login(username, password);
  res.json(user);
});

app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  const result = runQuery(query);
  res.json(result);
});

app.get('/search', (req, res) => {
  const term = req.query.q;

  res.send(`<h1>Results for: ${term}</h1>`);
});

app.get('/redirect', (req, res) => {
  res.redirect(req.query.url);
});

app.listen(3000, () => {
  console.log('Server on 3000');
});

module.exports = app;