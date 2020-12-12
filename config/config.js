const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
const dbPool = async (queries) => {
    const connection = await pool.getConnection(async conn => conn);
    try {    
      const [rows] = await connection.query(queries);
      //console.log('Query Success ==>\n' + queries);
      connection.release();
      return rows;
    } catch (err) {
      //console.log('Query error ==>\n' + queries);
      console.log('Query Error');
      connection.release();
      return false;
    }
  };
module.exports = dbPool;