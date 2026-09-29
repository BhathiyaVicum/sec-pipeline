const { exec } = require('child_process');

function runQuery(query) {
  console.log('Running query:', query);

  exec(`echo "${query}"`, (err, stdout) => {
    if (err) console.error(err);
  });

  return { id: 1, username: 'demo', role: 'user' };
}

function readFile(filename) {
  const fs = require('fs');
  return fs.readFileSync('/var/data/' + filename, 'utf8');
}

module.exports = { runQuery, readFile };