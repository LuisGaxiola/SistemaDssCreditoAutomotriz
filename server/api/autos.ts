import { useBody, useCookies, useQuery } from 'h3'
import { mariaPool } from '../modules/database'
type auto = {
  clave: string,
  nombre: string,
  valorComercial: number,
  plan: number,
  urlImagen: string
}
const dummyAutos: auto[] = [
  {
    clave: 'L1',
    nombre: 'Sentra 2020',
    valorComercial: 300000,
    plan: 1,
    urlImagen: '/images/sentra.jpg'
  },
  {
      clave: 'L2',
      nombre: 'Sentra 2020',
      valorComercial: 400000,
      plan: 2,
      urlImagen: '/images/sentra.jpg'
    },
    {
      clave: 'L3',
      nombre: 'Tacoma 2020',
      valorComercial: 500000,
      plan: 3,
      urlImagen: '/images/tacoma.jpg'
    }
]
async function createAutosTable() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP TABLE IF EXISTS autos`)
  await conn.query(`CREATE TABLE IF NOT EXISTS autos (
  clave VARCHAR(3) PRIMARY KEY,
  nombre VARCHAR(200),
  valorComercial INT,
  plan INT,
  urlImagen VARCHAR(200)
);`)
  conn.end()
}
async function insertDummyAutos() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE autos`)
  let query = `INSERT INTO autos (clave, nombre, valorComercial, plan, urlImagen) VALUES `
  dummyAutos.forEach((auto, index) => {
    query += `('${auto.clave}', '${auto.nombre}', ${auto.valorComercial}, ${auto.plan}, '${auto.urlImagen}')`
    if (index !== dummyAutos.length - 1) { query += ',' }
  })
  await conn.query(query)
  conn.end()
}
async function selectAllAutos() {
  const conn = await mariaPool.getConnection()
  const result = await conn.query(`SELECT * FROM autos`)
  conn.end()
  return result as auto[]
}
export default async (req, res) => {
  await createAutosTable()
  await insertDummyAutos()
  return await selectAllAutos()
}
