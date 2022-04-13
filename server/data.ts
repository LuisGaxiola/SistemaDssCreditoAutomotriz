import mariadb from 'mariadb'

const dbAbel = {
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'sistema_credito_automotriz',
  connectionLimit: 5
}

const dbLuis = {
  host: 'localhost',
  user: 'root',
  database: 'sistema_credito_automotriz',
  connectionLimit: 5
}

const mariaPool = mariadb.createPool(dbLuis);

export type usuario = {
  id?: number,
  nombre: string,
  login: string,
  password: string
}

const Usuarios: usuario[] = [
  {
    nombre: 'Jazmin Guadalupe',
    login: 'jazz',
    password: 'jazminpass'
  },
  {
    nombre: 'Jennifer Elena',
    login: 'jennifer',
    password: 'jennnnifer'
  },
  {
    nombre: 'María Lourdes',
    login: 'lourdes',
    password: 'lourdespass'
  },
  {
    nombre: 'Jose Abel',
    login: 'abel',
    password: 'lkksxd'
  },
  {
    nombre: 'Juan Manuel',
    login: 'juan',
    password: 'juanma'
  },
  {
    nombre: 'Luis',
    login: 'luis',
    password: 'luis321'
  },
]

export function createUsuariosTable () {
  return mariaPool.query(`CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)`)
}

export async function insertUsuarios () {
  await mariaPool.query(`TRUNCATE TABLE usuarios`)
  let query = `INSERT INTO usuarios (nombre, login, password) VALUES `
  Usuarios.forEach((usuario, index) => {
    query += `('${usuario.nombre}', '${usuario.login}', '${usuario.password}')`
    if (index < Usuarios.length - 1) {
      query += ', '
    }
  })
  await mariaPool.query(query)
}

export async function selectUsuarioByLogin (login: string) {
  const [result] = await mariaPool.query(`
    SELECT * FROM usuarios
    WHERE login = ?
  `, [login])
  return result as usuario
}

export function selectUsuarios () {
  return mariaPool.query(`SELECT * FROM usuarios`)
}

type persona = {
  curp: string,
  nombre: string,
  domicilio: string,
}
const Personas: persona[] = [
  {
    curp: 'GALL020308HSLXPSA4',
    nombre: 'Jose Luis',
    domicilio: 'Calle 5, Guasave, Sinaloa.',
  },
  {
    curp: 'GALL520308HSLXPSA3',
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
export async function insertPersonas() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE personas`)
  let query = `INSERT INTO personas (curp, nombre, domicilio) VALUES `
  Personas.forEach((persona, index) => {
    query += `('${persona.curp}', '${persona.nombre}', '${persona.domicilio}')`
    if (index !== Personas.length - 1) { query += ',' }
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
const Planes: plan[] = [
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
export async function insertPlanes() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE planes`)
  let query = `INSERT INTO planes (nombre, color, valorMinimo, valorMaximo) VALUES `
  Planes.forEach((plan, index) => {
    query += `('${plan.nombre}', '${plan.color}', ${plan.valorMinimo}, ${plan.valorMaximo})`
    if (index !== Planes.length - 1) { query += ',' }
  })
  await conn.query(query)
  conn.end()
}
export async function selectAllPlanes() {
  await createPlanesTable()
  await insertPlanes()
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
  nombreImagen: string
}
const Autos: auto[] = [
  {
    nombre: "Nissan X-Trail 2022",
    valorComercial: 576000,
    nombreImagen: "nissan_x-trail_2022.jpg"
  },
  {
    nombre: "Nissan Versa 2022",
    valorComercial: 290000,
    nombreImagen: "nissan_versa_2022.jpg"
  },
  {
    nombre: "Nissan March 2022",
    valorComercial: 216000,
    nombreImagen: "nissan_march_2022.jpg"
  },
  {
    nombre: "Nissan Kicks 2022",
    valorComercial: 384000,
    nombreImagen: "nissan_kicks_2022.jpg"
  },
  {
    nombre: "Nissan Sentra 2022",
    valorComercial: 364000,
    nombreImagen: "nissan_sentra_2022.jpg"
  },
  {
    nombre: "Nissan V-Drive 2022",
    valorComercial: 203900.00,
    nombreImagen: "nissan_v_drive_2022.jpg"
  },
  {
    nombre: "Nissan Frontier 2022",
    valorComercial: 468000,
    nombreImagen: "nissan_frontier_2022.jpg"
  },
  {
    nombre: "Tesla Model Y",
    valorComercial: 1418300,
    nombreImagen: "tesla_model_y.jpg"
  },
  {
    nombre: "BMW Serie 7 xDrive 2022",
    valorComercial: 4190000.00,
    nombreImagen: "bmw_serie_7_xDrive_2022.jpg"
  },
  {
    nombre: "Mercedes-AMG GT R 2020",
    valorComercial: 4538900.00,
    nombreImagen: "mercedes-amg_gt_r_2020.jpg"
  },
  {
    nombre: "Bentley Continental GT V8 2020",
    valorComercial: 5822199.00,
    nombreImagen: "bentley_continental_gt_v8_2020.jpg"
  },
  {
    nombre: "Lamborghini Aventador S 2017",
    valorComercial: 8272954.00,
    nombreImagen: "lamborghini_aventador_s_2017.jpg"
  },
  {
    nombre: "Ferrari SF90 Spyder 2016",
    valorComercial: 9518330.00,
    nombreImagen: "ferrari_sf90_spyder_2016.jpg"
  },
  {
    nombre: "Renault Kwid 2022",
    valorComercial: 181500.00,
    nombreImagen: "renault_kwid_2022.jpg"
  },
  {
    nombre: "Chevrolet Beat 2022",
    valorComercial: 197400.00,
    nombreImagen: "chevrolet_beat_2022.jpg"
  },
  {
    nombre: "Hyundai Grand i10 2022",
    valorComercial: 201300.00,
    nombreImagen: "hyundai_grand_i10_2022.jpg"
  },
  {
    nombre: "Volkswagen Gol 2022",
    valorComercial: 205990.00,
    nombreImagen: "volkswagen_gol_2022.jpg"
  },
  {
    nombre: 'Volkswagen Vitrus 2022',
    valorComercial: 334990.00,
    nombreImagen: 'volkswagen_vitrus_2022.jpg'
  },
  {
    nombre: 'Volkswagen Jetta 2022',
    valorComercial: 379990.00,
    nombreImagen: 'volkswagen_jetta_2022.jpg'
  },
  {
    nombre: 'Volkswagen Vento 2022',
    valorComercial: 272990.00,
    nombreImagen: 'volkswagen_vento_2022.jpg'
  },
  {
    nombre: 'Ford Maverick 2022',
    valorComercial: 647500.00,
    nombreImagen: 'ford_maverick_2022.jpg'
  },
  {
    nombre: 'Ford Ranger 2022',
    valorComercial: 532300.00,
    nombreImagen: 'ford_ranger_2022.jpg'
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
    autos.nombreImagen,
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
  nombreImagen VARCHAR(200),
  PRIMARY KEY(clave)
);`)
  conn.end()
}
export async function insertAutos() {
  const conn = await mariaPool.getConnection()
  await conn.query(`TRUNCATE TABLE autos`)
  let query = `INSERT INTO autos (nombre, valorComercial, nombreImagen) VALUES `
  Autos.forEach((auto, index) => {
    query += `('${auto.nombre}', ${auto.valorComercial}, '${auto.nombreImagen}')`
    if (index !== Autos.length - 1) { query += ',' }
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
