import * as data from '../data'

export default async (req, res) => {
    await data.createPlanesTable()
    await data.insertDummyPlanes()
    return await data.selectAllPlanes()
  }
  