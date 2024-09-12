import { useEffect, useState, useMemo } from "react";
import NavBar from "../componentes/NavBar";
import BotonNavbar from "../componentes/Atomos/BotonNavbar";
import InputEtiqueta from "../componentes/Atomos/InputEtiqueta";
import BotonNormal from "../componentes/Atomos/BotonNormal";
import TarjetaPrestamo from "../componentes/Moleculas/TarjetaPrestamos";
import TarjetaPrestamoPendiente from "../componentes/Moleculas/TarjetaPrestamoPendiente";
import { getPrestamosAprobados, getPrestamosPendientes, getTablaAmortizacion } from "../hooks/creditos";
import { buscarCreditosAprobados, buscarCreditosPendientes } from "../utils/creditos";
import FrameElegirCliente from "../componentes/FrameElegirCliente";
import TablaAmortizacion from "../componentes/AmortizationTable";

function Creditos() {

  const [prestamosAprobados, setPrestamosAprobados] = useState([])
  const [prestamosPendientes, setPrestamosPendientes] = useState([])
  const [abrirFrameElegirCliente, setAbrirFrameElegirCliente] = useState(false)
  const [vista, setVista] = useState("creditosAprobados")

  const handleVista = (vistaSeleccionada) => setVista(vistaSeleccionada)
  const handleFrameElegirCliente = (abrir) => setAbrirFrameElegirCliente(abrir)

  useEffect(() => {
    if (vista === "creditosAprobados") {
      getPrestamosAprobados().then(setPrestamosAprobados)
    } else if (vista === "creditosPendientes") {
      getPrestamosPendientes().then(setPrestamosPendientes)
    }
  }, [vista])

  const tarjetasAprobados = useMemo(() => {
    return prestamosAprobados.map(prestamo => (
      <TarjetaPrestamo
        key={prestamo.idCredito}
        nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
        cedulaCliente={prestamo.Persona.cedula}
        cuotasRestantes={prestamo.tiempo}
        saldoPendiente={prestamo.monto}
        onClick={() => handleTablaAmortizacion(prestamo.idCredito)}
      />
    ))
  }, [prestamosAprobados])

  const tarjetasPendientes = useMemo(() => {
    return prestamosPendientes.map(prestamo => (
      <TarjetaPrestamoPendiente
        key={prestamo.idCredito}
        monto={prestamo.monto}
        nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
        cedulaCliente={prestamo.Persona.cedula}
      />
    ))
  }, [prestamosPendientes])

  const handleTablaAmortizacion = async (idCredito) => {
    try {
      const tablaAmortizacion = await getTablaAmortizacion(idCredito)
      console.log(tablaAmortizacion)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center w-screen px-[68px] py-[30px]">
      <NavBar>
        <BotonNavbar text="Créditos aprobados" onClick={() => handleVista("creditosAprobados")} activo={vista === "creditosAprobados"} />
        <BotonNavbar text="Créditos pendientes" onClick={() => handleVista("creditosPendientes")} activo={vista === "creditosPendientes"} />
        <BotonNavbar text="Informes" onClick={() => handleVista("informes")} activo={vista === "informes"} />
      </NavBar>
      <>
        {vista === "creditosAprobados" && (
          <div className="w-full">
            <section className="flex w-full mt-[40px] items-end justify-between">
              <InputEtiqueta
                etiqueta="Buscar crédito"
                type="text"
                placeholder="ej. 0403030303 / Juan Perez"
                width={'358px'}
              />
              <BotonNormal texto="CREAR CRÉDITO" width={'auto'} height={'44px'} color={'#208768'} hover={'#166653'} onClick={() => handleFrameElegirCliente(true)} />
            </section>
            <section className="mt-[30px] flex justify-center">
              <div className="flex flex-wrap justify-center gap-x-[70px] gap-y-[30px]">
                {tarjetasAprobados}
              </div>
            </section>
          </div>
        )}
        {vista === "creditosPendientes" && (
          <div className="w-full">
            <section className="flex w-full mt-[40px] items-end justify-between">
              <InputEtiqueta
                etiqueta="Buscar crédito"
                type="text"
                placeholder="ej. 0403030303 / Juan Perez"
                width={'358px'}
              />
            </section>
            <section className="mt-[30px] flex justify-center">
              <div className="flex flex-wrap justify-center gap-x-[70px] gap-y-[30px]">
                {tarjetasPendientes}
              </div>
            </section>
          </div>
        )}
        {vista === "informes" && (
          <div>
            {<TablaAmortizacion  />}
          </div>
        )}
        {abrirFrameElegirCliente && (
          <FrameElegirCliente handleClickCerrarFrameElegirCliente={() => handleFrameElegirCliente(false)} />
        )}
      </>
    </div>
  );
}

export default Creditos;