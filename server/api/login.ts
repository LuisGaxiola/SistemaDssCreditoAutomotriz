import * as data from '../data'
import { useBody } from 'h3'
import { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
  await data.createUsuariosTable()
  await data.insertUsuarios()
  const { login, password }: data.usuario = await useBody(req)
  const usuarioMismoLogin = await data.selectUsuarioByLogin(login)
  if (usuarioMismoLogin && usuarioMismoLogin.password === password) {
    return { id: usuarioMismoLogin.id, nombre: usuarioMismoLogin.nombre }
  } else { return false }
}