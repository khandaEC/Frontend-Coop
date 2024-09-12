const CREDITOS_APROBADOS = import.meta.env.VITE_REACT_APP_CREDITOS_APROBADOS;
const CREDITOS_PENDIENTES = import.meta.env.VITE_REACT_APP_CREDITOS_PENDIENTES;
const GET_TABLA_AMORTIZACION = import.meta.env.VITE_REACT_APP_GET_TABLA_AMORTIZACION;
const POST_CREAR_CREDITO = import.meta.env.VITE_REACT_APP_CREAR_CREDITO;

export const getPrestamosAprobados = async () => {
  try {
    const response = await fetch(CREDITOS_APROBADOS);
    if (!response.ok) {
      throw new Error(`Error al obtener créditos aprobados: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getPrestamosAprobados:", error);
    return [];
  }
};

export const getPrestamosPendientes = async () => {
  try {
    const response = await fetch(CREDITOS_PENDIENTES);
    if (!response.ok) {
      throw new Error(`Error al obtener créditos pendientes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getPrestamosPendientes:", error);
    return [];
  }
};

export const getTablaAmortizacion = async (idCredito) => {
  try {
    const response = await fetch(`${GET_TABLA_AMORTIZACION}?idCredito=${idCredito}`);
    if (!response.ok) {
      throw new Error(`Error al obtener tabla de amortización: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getTablaAmortizacion:", error);
    return [];
  }
};

export const postCrearCredito = async (data) => {
  try {
    const response = await fetch(POST_CREAR_CREDITO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al crear crédito: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en postCrearCredito:", error);
    return null;
  }
};
