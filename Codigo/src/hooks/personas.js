const PERSONAS = import.meta.env.VITE_REACT_APP_PERSONAS

export const getPersonas = () => {
  return fetch(PERSONAS)
    .then(response => response.json())
    .catch(error => {
      console.log(error)
      return []
    })
}