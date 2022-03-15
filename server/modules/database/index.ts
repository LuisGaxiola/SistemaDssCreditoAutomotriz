import sql from "mssql"

export const main = async () => {
  try {
    const connString = `Data Source=DESKTOP-C7HN874\\SQLEXPRESS;Initial Catalog=SistemaCreditoAutomotriz;Integrated Security=True;Trusted_Connection=Yes;`
    // const result = await b.query`select * from Personas`
    const pool = new sql.ConnectionPool({
      server: "DESKTOP-C7HN874\\SQLEXPRESS",
      database: "SistemaCreditoAutomotriz",
      options: {
        trustedConnection: true
      }
    });
    await pool.connect();
    const request = new sql.Request(pool);
    const query = `select * from Personas`;
    const result = await request.query(query);
    console.dir(result);
  } catch (err) {
    // ... error checks
    console.log(err)
  }
}