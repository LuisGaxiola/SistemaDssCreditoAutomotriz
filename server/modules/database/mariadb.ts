import mariadb from 'mariadb'
const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5});

async function asyncFunction() {
  let conn;
  try {
  	conn = await pool.getConnection();
  	const rows = await conn.query("SELECT 1 as val");
  	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  } finally {
	if (conn) conn.release();
  }
}