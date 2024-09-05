import { useState } from "react";
import NavBar from "../componentes/NavBar";
import BotonNavbar from "../componentes/Atomos/BotonNavbar";
import InputEtiqueta from "../componentes/Atomos/InputEtiqueta";
import BotonNormal from "../componentes/Atomos/BotonNormal";
import TarjetaPrestamo from "../componentes/Moleculas/TarjetaPrestamos";

function Creditos() {

  const [creditosAprobados, setCreditosAprobados] = useState(true)
  const [creditosPendientes, setCreditosPendientes] = useState(false)
  const [informes, setInformes] = useState(false)

  const handleClickCreditosAprobados = () => {
    setCreditosAprobados(true)
    setCreditosPendientes(false)
    setInformes(false)
  }

  const handleClickCreditosPendientes = () => {
    setCreditosAprobados(false)
    setCreditosPendientes(true)
    setInformes(false)
  }

  const handleClickInformes = () => {
    setCreditosAprobados(false)
    setCreditosPendientes(false)
    setInformes(true)
  }

  return (
    <div className="flex flex-col items-center w-screen px-[68px] py-[30px]">
      <NavBar>
        <BotonNavbar text="Créditos aprobados" onClick={handleClickCreditosAprobados} activo={creditosAprobados} />
        <BotonNavbar text="Créditos pendientes" onClick={handleClickCreditosPendientes} activo={creditosPendientes} />
        <BotonNavbar text="Informes" onClick={handleClickInformes} activo={informes} />
      </NavBar>
      <>
        {creditosAprobados && (
          <div className="w-full">
            <section className="flex w-full mt-[40px] items-end justify-between">
              <InputEtiqueta etiqueta="Buscar crédito" type="text" placeholder="ej. 0403030303 / Juan Perez" />
              <BotonNormal texto="CREAR CRÉDITO" width={'auto'} height={'44px'} />
            </section>
            <section className="mt-[30px] flex justify-center">
              <div className="grid grid-cols-3 gap-x-[70px] gap-y-[30px]">
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
                <TarjetaPrestamo nombreCliente={'Terán Ramos José David'} cedulaCliente={'0401010101'} cuotasRestantes={'12'} valorCuota={3000} />
              </div>
            </section>
          </div>
        )}
        {creditosPendientes && (
          <div>
            <h1>Créditos pendientes</h1>
          </div>
        )}
        {informes && (
          <div>
            <h1>Informes</h1>
          </div>
        )}
      </>
    </div>
  );
}

export default Creditos;