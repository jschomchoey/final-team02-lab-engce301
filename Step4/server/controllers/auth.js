const { response } = require("express");
const pool = require("../dbconfig.js");

// ฟังก์ชัน login
const login = async (req, res = response) => {
  const { email, password } = req.body;

  // คำสั่ง SQL ในการค้นหาผู้ใช้งาน
  const query = "SELECT * FROM users WHERE email = ?";

  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err.stack);
      return res.status(500).json({
        msg: "Database connection error",
      });
    }

    // ตรวจสอบว่าพบผู้ใช้งานหรือไม่
    if (results.length > 0) {
      const user = results[0];

      // ตรวจสอบรหัสผ่าน
      if (password !== user.password) {
        return res.status(400).json({
          msg: "User / Password are incorrect",
        });
      }

      // ถ้ารหัสผ่านถูกต้อง ตอบกลับด้วยข้อมูลผู้ใช้งาน
      return res.status(200).json({
        name: `${user.name_first} ${user.name_last}`,
        email: user.email,
        token: "A JWT token to keep the user logged in.",
        msg: "Successful login",
      });
    } else {
      // กรณีไม่พบผู้ใช้งาน
      return res.status(401).json({
        msg: "User not found!",
      });
    }
  });
};

module.exports = {
  login,
};
