import * as data from '../data'

export default async (req, res) => {
    await data.createAutosTable()
    await data.createAutosPlanView()
    await data.insertDummyAutos()
    return await data.selectAllAutos()
  }