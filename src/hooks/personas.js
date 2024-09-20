const PERSONAS = import.meta.env.VITE_REACT_APP_PERSONAS;
const CREARPERSONA = import.meta.env.VITE_REACT_APP_CREAR_PERSONA;

export const getPersonas = async () => {
  try {
    const response = await fetch(PERSONAS);
    if (!response.ok) {
      throw new Error(`Error al obtener personas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getPersonas:", error);
    return [];
  }
};

export const postCrearPersona = async (data) => {
  try {
    const response = await fetch(CREARPERSONA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al crear persona: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en postCrearPersona:", error);
    return null;
  }
};
