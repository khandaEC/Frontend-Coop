const CREDITOS_APROBADOS = import.meta.env.VITE_REACT_APP_CREDITOS_APROBADOS
const CREDITOS_PENDIENTES = import.meta.env.VITE_REACT_APP_CREDITOS_PENDIENTES

export const getPrestamosAprobados = () => {
  return fetch(CREDITOS_APROBADOS)
    .then(response => response.json())
    .catch(error => {
      console.log(error)
      return []
    })
}

export const getPrestamosPendientes = () => {
  return fetch(CREDITOS_PENDIENTES)
    .then(response => response.json())
    .catch(error => {
      console.log(error)
      return []
    })
}