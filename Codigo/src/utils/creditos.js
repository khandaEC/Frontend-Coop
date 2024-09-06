import { getPrestamosAprobados, getPrestamosPendientes } from '../hooks/creditos'

export const buscarCreditosAprobados = async (nombre) => {
  nombre = nombre.toLowerCase()
  const creditosAprobados = await getPrestamosAprobados()
  return creditosAprobados.filter(credito => credito.nombreCliente === nombre)
}

export const buscarCreditosPendientes = async (nombre) => {
  nombre = nombre.toLowerCase()
  const creditosPendientes = await getPrestamosPendientes()
  return creditosPendientes.filter(credito => credito.nombreCliente === nombre)
}