// Khởi động server.

// const app = require('./app');
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '07052004',
    database: 'quanlykhoahoc'
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL')
})

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO `users` (`fullname`, `email` , `password_user`) VALUES(?)'
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]
    //console.log([values])
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data)
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE `email` = ? AND `password_user` = ?'
    //console.log([req.body.email, req.body.password])
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        if (data.length > 0) {
            return res.json("success")
        } else {
            return res.json("fail")
        }
    })
})
app.listen(5000, ()=> {
    console.log('Connect port successfully')
})