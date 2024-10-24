// dbconfig.js
const mysql = require('mysql2');
const env = require('./env');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL ด้วย Pool
const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ตรวจสอบการเชื่อมต่อ
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
  connection.release(); // คืนการเชื่อมต่อกลับไปที่ Pool
});

module.exports = pool;
