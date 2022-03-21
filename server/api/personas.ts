import type { IncomingMessage, ServerResponse } from 'http'
import { useBody, useCookies, useQuery } from 'h3'
import { mariaPool } from '../modules/database'

type persona = {
  curp: string,
  nombre: string,
  domicilio: string,
}
const dummyPersonas: persona[] = [
  {
    curp: 'GALL020308HSLXPSA4',
    nombre: 'Jose Luis',
    domicilio: 'Calle 5, Guasave, Sinaloa.',
  },
  {
    curp: 'GALL020308HSLXPSA3',
    nombre: 'Jose Juan',
    domicilio: 'Calle 5, Guasave, Sinaloa.',
  }
]
async function createPersonasTable() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP TABLE IF EXISTS personas`)
  await conn.query(`CREATE TABLE IF NOT EXISTS personas (
  curp VARCHAR(18) PRIMARY KEY,
  nombre VARCHAR(200),
  domicilio VARCHAR(200)
);`)
  conn.end()
}
async function insertDummyPersonas() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE personas`)
  let query = `INSERT INTO personas (curp, nombre, domicilio) VALUES `
  dummyPersonas.forEach((persona, index) => {
    query += `('${persona.curp}', '${persona.nombre}', '${persona.domicilio}')`
    if (index !== dummyPersonas.length - 1) { query += ',' }
  })
  await conn.query(query)
  conn.end()
}
async function selectPersonaByCurp(curp: string) {
  const conn = await mariaPool.getConnection()
  const [result] = await conn.query(`SELECT * FROM personas WHERE curp = ?`, [curp])
  conn.end()
  return result as persona
}
export default async (req: IncomingMessage, res: ServerResponse) => {
  await createPersonasTable()
  await insertDummyPersonas()
  const curp = await useBody(req)
  return selectPersonaByCurp(curp)
}
