const CREDITOS_APROBADOS = import.meta.env.VITE_REACT_APP_CREDITOS_APROBADOS;
const CREDITOS_PENDIENTES = import.meta.env.VITE_REACT_APP_CREDITOS_PENDIENTES;
const GET_TABLA_AMORTIZACION = import.meta.env.VITE_REACT_APP_GET_TABLA_AMORTIZACION;
const POST_CREAR_CREDITO = import.meta.env.VITE_REACT_APP_CREAR_CREDITO;
const POST_CALCULAR_ABONO = import.meta.env.VITE_REACT_APP_CALCULAR_ABONO;
const POST_PAGAR_ABONO = import.meta.env.VITE_REACT_APP_PAGAR_ABONO;

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

export const patchAprobarCredito = async (idCredito) => {
  try {
    const response = await fetch(`${POST_CREAR_CREDITO}/${idCredito}/estadoAprobado`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error(`Error al aprobar crédito: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en patchAprobarCredito:", error);
    return null;
  }
}

export const patchRechazarCredito = async (idCredito) => {
  try {
    const response = await fetch(`${POST_CREAR_CREDITO}/${idCredito}/estadoRechazado`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error(`Error al aprobar crédito: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en patchAprobarCredito:", error);
    return null;
  }
}

export const getBuscarCreditoAprobado = async ({ nombres = '', cedula = '' }) => {
  try {
    const response = await fetch(`${CREDITOS_APROBADOS}&nombres=${nombres}&cedula=${cedula}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error al buscar crédito aprobado: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getBuscarCreditoAprobado:", error);
    return [];
  }
};

export const getBuscarCreditoPendiente = async ({ nombres = '', cedula = '' }) => {
  try {
    const response = await fetch(`${CREDITOS_PENDIENTES}&nombres=${nombres}&cedula=${cedula}`);
    if (!response.ok) {
      throw new Error(`Error al buscar crédito pendiente: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getBuscarCreditoPendiente:", error);
    return [];
  }
};

export const patchActualizarCredito = async (idCredito, data) => {
  try {
    const response = await fetch(`${POST_CREAR_CREDITO}/${idCredito}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar crédito: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en patchActualizarCredito:", error);
    return null;
  }
}

export const postCalcularAbono = async (data) => {
  try {
    const response = await fetch(POST_CALCULAR_ABONO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al calcular abono: ${response.statusText}`);
    }
    const responseData = await response.json();
    console.log('Respuesta del servidor:', responseData);

    return responseData;
  } catch (error) {
    console.error("Error en postCalcularAbono:", error);
    return null;
  }
}

export const postPagarAbono = async (data) => {
  try {
    const response = await fetch(POST_PAGAR_ABONO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al pagar abono: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en postPagarAbono:", error);
    return null;
  }
}