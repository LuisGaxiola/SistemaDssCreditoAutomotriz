import * as data from '../data'
import { useBody } from 'h3'
import {  IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
    await data.createPersonasTable()
    await data.insertPersonas()
    const curp = await useBody(req)
    return data.selectPersonaByCurp(curp)
  }