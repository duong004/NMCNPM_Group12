const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: root,
  password: 24072004,
  database: learningplatform,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = connection;