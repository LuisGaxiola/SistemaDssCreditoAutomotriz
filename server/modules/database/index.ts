import mariadb from 'mariadb'

export const mariaPool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sistema_credito_automotriz',
  connectionLimit: 5
});
