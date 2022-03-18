import sql from "mssql"

export const main = async () => {
  try {
    const connString = 'Data Source= DESKTOP-EE2NLAL\\JOSE12ABEL;Initial Catalog=CreditoAutomotriz;Integrated Security=True;Trusted_Connection=Yes;'
    
    const pool = new sql.ConnectionPool(connString);
    await pool.connect();
    const request = new sql.Request(pool);
    const query = 'select * from Clientes';
    const result = await request.query(query);
    console.log(result);
  } catch (err) {
    // ... error checks
    console.log(err)
  }
}