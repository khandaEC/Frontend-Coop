export const validarCamposLlenos = (campos) => {
  let camposVacios = [];

  for (const [campo, valor] of Object.entries(campos)) {
    if (valor === '' || valor === null || valor === undefined) {
      camposVacios.push(campo);
    }
  }

  if (camposVacios.length > 0) {
    alert(`Por favor llene los siguientes campos: ${camposVacios.join(', ')}`);
    return false;
  }

  return true;
}
