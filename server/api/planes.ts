import { useBody, useCookies, useQuery } from 'h3'
import { mariaPool } from '../modules/database'
type plan = {
  id: number,
  nombre: string,
  color: string,
  valorMinimo: number,
  valorMaximo: number,
}
const dummyPlanes: plan[] = [
  {
    id: 1,
    nombre: 'Todos pueden',
    color: '#ef0040',	
    valorMinimo: 0,
    valorMaximo: 220000
  },
  {
    id: 2,
    nombre: 'Estrena auto',
    color: '#4960bb',
    valorMinimo: 220001,
    valorMaximo: 380000
  },
  {
    id: 3,
    nombre: 'Premium',
    color: '#8020bb',
    valorMinimo: 380001,
    valorMaximo: 680000
  },
  {
    id: 4,
    nombre: 'Luxury',
    color: '#e02080',
    valorMinimo: 680001,
    valorMaximo: 10000000
  }
]
async function createPlanesTable() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP TABLE IF EXISTS planes`)
  await conn.query(`CREATE TABLE IF NOT EXISTS planes (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    valorMinimo INT NOT NULL,
    valorMaximo INT NOT NULL,
    PRIMARY KEY (id)
);`)
  conn.end()
}
async function insertDummyPlanes() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE planes`)
  let query = `INSERT INTO planes (nombre, color, valorMinimo, valorMaximo) VALUES `
  dummyPlanes.forEach((plan, index) => {
    query += `('${plan.nombre}', '${plan.color}', ${plan.valorMinimo}, ${plan.valorMaximo})`
    if (index !== dummyPlanes.length - 1) { query += ',' }
  })
  await conn.query(query)
  conn.end()
}
async function selectAllPlanes() {
  await createPlanesTable()
  await insertDummyPlanes()
  const conn = await mariaPool.getConnection()
  const result = await conn.query(`SELECT * FROM planes`)
  conn.end()
  return result as plan[]
}
export default async (req, res) => {
  await createPlanesTable()
  await insertDummyPlanes()
  return await selectAllPlanes()
}
