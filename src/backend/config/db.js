const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: a,
  user: b,
  password: c,
  database: d,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = connection;