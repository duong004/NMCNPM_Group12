// Tệp cấu hình kết nối cơ sở dữ liệu.

require('dotenv').config();
const mysql = require('mysql2');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');

  //
   // Chèn dữ liệu vào bảng users
   const insertQuery = `INSERT INTO users (user_id, name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?, ?)`;
   const insertValues = ['u123', 'John Doe', 'john.doe@example.com', 'securepassword', 'Học viên', false];
 
   connection.query(insertQuery, insertValues, (err, results) => {
     if (err) {
       console.error('Error inserting data:', err);
       return;
     }
     console.log('Data inserted:', results);
 
     // Đóng kết nối sau khi hoàn thành
     connection.end((err) => {
       if (err) {
         console.error('Error closing the connection:', err);
         return;
       }
       console.log('Connection closed.');
     });
   });
 
});

module.exports = connection;