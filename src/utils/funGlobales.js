export const validarCamposLlenos = (campos) => {
  let camposVacios = [];

  for (const [campo, valor] of Object.entries(campos)) {
    if (valor === '' || valor === null || valor === undefined) {
      camposVacios.push(campo);
    }
  }

  return camposVacios.length === 0;
}
