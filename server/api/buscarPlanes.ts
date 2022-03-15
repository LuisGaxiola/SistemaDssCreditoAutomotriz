import { useBody, useCookies, useQuery } from 'h3'
type plan = {
  id: number,
  nombre: string,
  limiteCredito: number,
  color: string
}
export default async (req, res) => {
  const planes: plan[] = [
    {
      id: 1,
      nombre: 'Todos pueden',
      limiteCredito: 20000,
      color: '#ef0040',	
    },
    {
      id: 2,
      nombre: 'Estrena auto',
      limiteCredito: 30000,
      color: '#4960bb',
    },
    {
      id: 3,
      nombre: 'Premium',
      limiteCredito: 40000,
      color: '#8020bb',
    },
    {
      id: 4,
      nombre: 'Luxury',
      limiteCredito: 50000,
      color: '#e02080',
    }
  ]
  return planes
}
