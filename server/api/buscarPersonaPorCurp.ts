import type { IncomingMessage, ServerResponse } from 'http'
import { useBody, useCookies, useQuery } from 'h3'
import { main } from '../modules/database'

type persona = {
  curp: string,
  nombre: string,
  domicilio: string,
}
export default async (req: IncomingMessage, res: ServerResponse) => {
  const personas: persona[] = [
    {
        curp: 'GALL020308HSLXPSA3',
        nombre: 'Maria',
        domicilio: 'Calle 4',
    },
    {
        curp: 'GALL020308HSLXPSA4',
        nombre: 'Jose Luis',
        domicilio: 'Calle 5, Guasave, Sinaloa.',
    }
  ]
  await main()
  const body = await useBody(req)
  return personas.find(persona => persona.curp === body)
}
