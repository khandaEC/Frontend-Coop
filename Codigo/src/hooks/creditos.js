const CREDITOS_APROBADOS = import.meta.env.VITE_REACT_APP_CREDITOS_APROBADOS

export const getPrestamosAprobados = () => {
  return fetch(CREDITOS_APROBADOS)
    .then(response => response.json())
    .catch(error => {
      console.log(error)
      return []
    })
}