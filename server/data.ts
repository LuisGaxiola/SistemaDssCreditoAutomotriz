import mariadb from 'mariadb'
const mariaPool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'sistema_credito_automotriz',
  connectionLimit: 5
});

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
  },
  {
    curp: 'HERJ001009MSLRDZA5',
    nombre: 'Jazmin Guadalupe Hernandez Rodriguez',
    domicilio: 'Calle coral, Guasave, Sinaloa.',
  },
  {
    curp: 'JURA010610HSLRMBA8',
    nombre: 'Jose Abel Juarez Ramirez',
    domicilio: 'Calle manabi, Guasave, Sinaloa.',
  },
  {
    curp: 'VAFJ000913HSLLLNA0',
    nombre: 'Juan Manuel Valdez Felix',
    domicilio: 'Calle Manzana, Guasave, Sinaloa.',
  },
  {
    curp: 'FERJ010909MSLLJNA1',
    nombre: 'Jennifer Eliany Felix Rejon',
    domicilio: 'Calle quimica, Guasave, Sinaloa.',
  },
  {
    curp: 'AOGM010908HSLCNRA4',
    nombre: 'Mario Daniel Acosta Gonzalez',
    domicilio: 'Calle Naranjo, Guasave, Sinaloa.',
  },
  {
    curp: 'REGM991118HSLYRR08',
    nombre: 'Marco Antonio Reyes Garcia',
    domicilio: 'Calle quimica, Guasave, Sinaloa.',
  },
  {
    curp: 'SORJ961006HSLBBS09',
    nombre: 'Jesus Gabriel Soberanes Rubio',
    domicilio: 'Calle quimica, Guasave, Sinaloa.',
  }
]
export async function createPersonasTable() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP TABLE IF EXISTS personas`)
  await conn.query(`CREATE TABLE IF NOT EXISTS personas (
  curp VARCHAR(18) PRIMARY KEY,
  nombre VARCHAR(200),
  domicilio VARCHAR(200)
);`)
  conn.end()
}
export async function insertDummyPersonas() {
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
export async function selectPersonaByCurp(curp: string) {
  const conn = await mariaPool.getConnection()
  const [result] = await conn.query(`SELECT * FROM personas WHERE curp = ?`, [curp])
  conn.end()
  return result as persona
}

type plan = {
  id?: number,
  nombre: string,
  color: string,
  valorMinimo: number,
  valorMaximo: number,
}
const dummyPlanes: plan[] = [
  {
    nombre: 'Todos pueden',
    color: '#ef0040',
    valorMinimo: 0,
    valorMaximo: 220000
  },
  {
    nombre: 'Estrena auto',
    color: '#4960bb',
    valorMinimo: 220001,
    valorMaximo: 380000
  },
  {
    nombre: 'Premium',
    color: '#8020bb',
    valorMinimo: 380001,
    valorMaximo: 680000
  },
  {
    nombre: 'Luxury',
    color: '#e02080',
    valorMinimo: 680001,
    valorMaximo: 10000000
  }
]
export async function createPlanesTable() {
  const conn = await mariaPool.getConnection()
  conn.query(`DROP TABLE IF EXISTS planes`)
  await conn.query(`
  CREATE TABLE IF NOT EXISTS planes (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    valorMinimo INT NOT NULL,
    valorMaximo INT NOT NULL,
    PRIMARY KEY (id)
);`)
  conn.end()
}
export async function insertDummyPlanes() {
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
export async function selectAllPlanes() {
  await createPlanesTable()
  await insertDummyPlanes()
  const conn = await mariaPool.getConnection()
  const result = await conn.query(`SELECT * FROM planes`)
  conn.end()
  return result as plan[]
}

type auto = {
  clave?: number,
  nombre: string,
  valorComercial: number,
  plan?: number,
  urlImagen: string
}
const dummyAutos: auto[] = [
  {
    nombre: "Nissan X-Trail 2022",
    valorComercial: 576000,
    urlImagen: "nissan_x-trail_2022.jpeg"
  },
  {
    nombre: "Nissan Versa 2022",
    valorComercial: 290000,
    urlImagen: "nissan_versa_2022.jpg"
  },
  {
    nombre: "Nissan March 2022",
    valorComercial: 216000,
    urlImagen: "nissan_march_2022.jpg"
  },
  {
    nombre: "Nissan Kicks 2022",
    valorComercial: 384000,
    urlImagen: "nissan_kicks_2022.jpg"
  },
  {
    nombre: "Nissan Altima 2022",
    valorComercial: 692000,
    urlImagen: "nissan_altima_2022.jpeg"
  },
  {
    nombre: "Nissan Frontier V6 Pro-4X 2022",
    valorComercial: 979000,
    urlImagen: "nissan_frontier_v6_pro-4x_2022.jpg"
  },
  {
    nombre: "Nissan Frontier 2022",
    valorComercial: 468000,
    urlImagen: "nissan_frontier_2022.jpg"
  },
  {
    nombre: "Nissan Sentra 2022",
    valorComercial: 364000,
    urlImagen: "nissan_sentra_2022.jpg"
  },
  {
    nombre: "BMW Serie 7 xDrive",
    valorComercial: 4190000.00,
    urlImagen: "BMW_Serie_7_xDrive.jpg"
  },
  {
    nombre: "Mercedes-AMG GT R",
    valorComercial: 4538900.00,
    urlImagen: "Mercedes_AMG_GT_R.jpg"
  },
  {
    nombre: "Bentley Continental GT V8",
    valorComercial: 5822199.00,
    urlImagen: "Bentley_Continental_GT_V8.jpg"
  },
  {
    nombre: "Lamborghini Aventador S",
    valorComercial: 8272954.00,
    urlImagen: "Lamborghini_Aventador_S.jpg"
  },
  {
    nombre: "Ferrari SF90 Spyder",
    valorComercial: 9518330.00,
    urlImagen: "Ferrari_SF90_Spyder.jpg"
  }
]

export async function createAutosPlanView() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP VIEW IF EXISTS autos_plan`)
  await conn.query(`CREATE VIEW autos_plan AS
  SELECT
    autos.clave,
    autos.nombre,
    autos.valorComercial,
    autos.urlImagen,
    planes.id as plan
  FROM
    autos
  INNER JOIN
    planes
  ON
    autos.valorComercial BETWEEN planes.valorMinimo AND planes.valorMaximo
  ORDER BY
    autos.valorComercial ASC`)
  conn.end()
}
export async function createAutosTable() {
  const conn = await mariaPool.getConnection()
  await conn.query(`DROP TABLE IF EXISTS autos`)
  await conn.query(`CREATE TABLE IF NOT EXISTS autos (
  clave INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200),
  valorComercial INT,
  urlImagen VARCHAR(200),
  PRIMARY KEY(clave)
);`)
  conn.end()
}
export async function insertDummyAutos() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE autos`)
  let query = `INSERT INTO autos (nombre, valorComercial, urlImagen) VALUES `
  dummyAutos.forEach((auto, index) => {
    query += `('${auto.nombre}', ${auto.valorComercial}, '${auto.urlImagen}')`
    if (index !== dummyAutos.length - 1) { query += ',' }
  })
  await conn.query(query)
  conn.end()
}
export async function selectAllAutos() {
  const conn = await mariaPool.getConnection()
  const result = await conn.query(`SELECT * FROM autos_plan`)
  conn.end()
  return result as auto[]
}
