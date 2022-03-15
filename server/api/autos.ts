import { useBody, useCookies, useQuery } from 'h3'
type auto = {
  clave: string,
  nombre: string,
  valorComercial: number,
  plan: number,
}
export default async (req, res) => {
  const autos: auto[] = [
    {
      clave: 'L1',
      nombre: 'Sentra 2020',
      valorComercial: 300000,
      plan: 1,
    },
    {
        clave: 'L2',
        nombre: 'Sentra 2020',
        valorComercial: 400000,
        plan: 2,
      },
      {
        clave: 'L3',
        nombre: 'Sentra 2020',
        valorComercial: 500000,
        plan: 3,
      },
      {
        clave: 'L4',
        nombre: 'Sentra 2020',
        valorComercial: 600000,
        plan: 4,
      },
  ]
  return autos
}
