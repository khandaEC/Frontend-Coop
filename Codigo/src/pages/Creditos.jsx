import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../componentes/NavBar";
import BotonNavbar from "../componentes/Atomos/BotonNavbar";
import InputEtiqueta from "../componentes/Atomos/InputEtiqueta";
import BotonNormal from "../componentes/Atomos/BotonNormal";
import TarjetaPrestamo from "../componentes/Moleculas/TarjetaPrestamos";
import TarjetaPrestamoPendiente from "../componentes/Moleculas/TarjetaPrestamoPendiente";
import { getPrestamosAprobados, getPrestamosPendientes } from "../hooks/creditos";
import FrameElegirCliente from "../componentes/FrameElegirCliente";
import { PATH_CREDITOS } from "../routes/paths";

function Creditos() {
  const [creditosAprobados, setCreditosAprobados] = useState(true);
  const [creditosPendientes, setCreditosPendientes] = useState(false);
  const [informes, setInformes] = useState(false);
  const [prestamosAprobados, setPrestamosAprobados] = useState([]);
  const [prestamosPendientes, setPrestamosPendientes] = useState([]);
  const [abrirFrameElegirCliente, setAbrirFrameElegirCliente] = useState(false);

  const navigate = useNavigate();

  const handleClickCreditosAprobados = () => {
    setCreditosAprobados(true);
    setCreditosPendientes(false);
    setInformes(false);
  };

  const handleClickCreditosPendientes = () => {
    setCreditosAprobados(false);
    setCreditosPendientes(true);
    setInformes(false);
  };

  const handleClickInformes = () => {
    setCreditosAprobados(false);
    setCreditosPendientes(false);
    setInformes(true);
  };

  const handleClickCrearCredito = () => {
    setAbrirFrameElegirCliente(true);
  };

  const handleClickCerrarFrameElegirCliente = () => {
    setAbrirFrameElegirCliente(false);
  };

  const handleClickVerAmortizacion = (idCredito) => {
    console.log(`Ver amortización del crédito ${idCredito}`);
    navigate(`${PATH_CREDITOS}/tablaAmortizacion/${idCredito}`);
  };
  
  useEffect(() => {
    if (creditosAprobados) {
      getPrestamosAprobados().then((data) => {
        setPrestamosAprobados(data);
        console.log(data);
      });
    }
    if (creditosPendientes) {
      getPrestamosPendientes().then((data) => {
        setPrestamosPendientes(data);
        console.log("pendientes", data);
      });
    }
  }, [creditosAprobados, creditosPendientes]);

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
              <InputEtiqueta
                etiqueta="Buscar crédito"
                type="text"
                placeholder="ej. 0403030303 / Juan Perez"
                width={"358px"}
              />
              <BotonNormal
                texto="CREAR CRÉDITO"
                width={"auto"}
                height={"44px"}
                color={"#208768"}
                hover={"#166653"}
                onClick={handleClickCrearCredito}
              />
            </section>
            <section className="mt-[30px] flex justify-center">
              <div className="flex flex-wrap justify-center gap-x-[70px] gap-y-[30px]">
                {prestamosAprobados.map((prestamo) => (
                  <TarjetaPrestamo
                    key={prestamo.idCredito}
                    nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
                    cedulaCliente={prestamo.Persona.cedula}
                    cuotasRestantes={prestamo.tiempo}
                    saldoPendiente={prestamo.monto}
                    onClick={() => handleClickVerAmortizacion(prestamo.idCredito)} // Llama a la función de clic
                  />
                ))}
              </div>
            </section>
          </div>
        )}
        {creditosPendientes && (
          <div className="w-full">
            <section className="flex w-full mt-[40px] items-end justify-between">
              <InputEtiqueta
                etiqueta="Buscar crédito"
                type="text"
                placeholder="ej. 0403030303 / Juan Perez"
                width={"358px"}
              />
            </section>
            <section className="mt-[30px] flex justify-center">
              <div className="flex flex-wrap justify-center gap-x-[70px] gap-y-[30px]">
                {prestamosPendientes.map((prestamo) => (
                  <TarjetaPrestamoPendiente
                    key={prestamo.idCredito}
                    monto={prestamo.monto}
                    nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
                    cedulaCliente={prestamo.Persona.cedula}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
        {informes && (
          <div>
            <h1>Informes</h1>
          </div>
        )}
        {abrirFrameElegirCliente && (
          <FrameElegirCliente handleClickCerrarFrameElegirCliente={handleClickCerrarFrameElegirCliente} />
        )}
      </>
    </div>
  );
}

export default Creditos;
