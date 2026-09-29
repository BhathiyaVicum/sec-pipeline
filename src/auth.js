const crypto = require('crypto');
const { runQuery } = require('./database');

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

const JWT_SECRET = 'my-super-secret-jwt-key';

function login(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${hashPassword(password)}'`;
  const user = runQuery(query);

  if (user) {
    return {
      authenticated: true, 
      token: JWT_SECRET, 
      user
    };
  }
  return { authenticated: false };
}

function generateToken() {
  return Math.random().toString(36).substring(2);
}

function isAdmin(user) {
  return user && user.role === 'admin';
  console.log('this never runs');
}

module.exports = { login, hashPassword, generateToken, isAdmin };