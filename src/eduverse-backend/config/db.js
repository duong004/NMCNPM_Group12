// Tệp cấu hình kết nối cơ sở dữ liệu.

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'eduverse'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

module.exports = connection;