import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../componentes/NavBar";
import BotonNavbar from "../componentes/Atomos/BotonNavbar";
import InputEtiqueta from "../componentes/Atomos/InputEtiqueta";
import BotonNormal from "../componentes/Atomos/BotonNormal";
import { getPrestamosAprobados, getPrestamosPendientes, getTablaAmortizacion, getBuscarCreditoAprobado, getBuscarCreditoPendiente } from "../hooks/creditos";
import FrameElegirCliente from "../componentes/FrameElegirCliente";
import { PATH_CREDITOS } from "../routes/paths";
import TarjetaPrestamo, { TarjetaPrestamoSkeleton } from "../componentes/Moleculas/TarjetaPrestamos";
import TarjetaPrestamoPendiente, { TarjetaPrestamoPendienteSkeleton } from "../componentes/Moleculas/TarjetaPrestamoPendiente";

function Creditos() {

  const [prestamosAprobados, setPrestamosAprobados] = useState([])
  const [prestamosPendientes, setPrestamosPendientes] = useState([])
  const [abrirFrameElegirCliente, setAbrirFrameElegirCliente] = useState(false)
  const [vista, setVista] = useState("creditosAprobados")
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleVista = (vistaSeleccionada) => setVista(vistaSeleccionada)

  const handleFrameElegirCliente = (abrir) => setAbrirFrameElegirCliente(abrir)

  useEffect(() => {
    setLoading(true);
    if (vista === "creditosAprobados") {
      getPrestamosAprobados().then(data => {
        setPrestamosAprobados(data);
        setLoading(false);
      });
      setBusqueda('');
    } else if (vista === "creditosPendientes") {
      getPrestamosPendientes().then(data => {
        setPrestamosPendientes(data);
        setLoading(false);
      });
      setBusqueda('');
    }
  }, [vista]);

  const tarjetasAprobados = useMemo(() => {

    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => <TarjetaPrestamoSkeleton key={index} />);
    }

    return prestamosAprobados.map(prestamo => (
      <TarjetaPrestamo
        key={prestamo.idCredito}
        nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
        cedulaCliente={prestamo.Persona.cedula}
        cuotasRestantes={prestamo.tiempo}
        saldoPendiente={prestamo.monto}
        onClick={() => handleTablaAmortizacion(prestamo.idCredito, prestamo)}
      />
    ));
  }, [prestamosAprobados, loading]);

  const tarjetasPendientes = useMemo(() => {

    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => <TarjetaPrestamoPendienteSkeleton key={index} />);
    }

    return prestamosPendientes.map(prestamo => (
      <TarjetaPrestamoPendiente
        key={prestamo.idCredito}
        monto={prestamo.monto}
        nombreCliente={`${prestamo.Persona.nombres} ${prestamo.Persona.apellidos}`}
        cedulaCliente={prestamo.Persona.cedula}
        onClick={() => handleTablaAmortizacion(prestamo.idCredito, prestamo)}
      />
    ));
  }, [prestamosPendientes, loading]);

  const handleTablaAmortizacion = async (idCredito, prestamo) => {
    navigate(`${PATH_CREDITOS}/${idCredito}`, { state: { creditoCreado: prestamo, clienteCreado: prestamo.Persona } });
  }

  const handleBuscarCredito = async (busqueda) => {
    setLoading(true);
    try {
      const esCedula = /^[0-9]{10}$/.test(busqueda);
      if (vista === "creditosAprobados") {
        const creditos = esCedula
          ? await getBuscarCreditoAprobado({ cedula: busqueda })
          : await getBuscarCreditoAprobado({ nombres: busqueda });
        setPrestamosAprobados(creditos);
        setLoading(false);
      } else if (vista === "creditosPendientes") {
        const creditos = esCedula
          ? await getBuscarCreditoPendiente({ cedula: busqueda })
          : await getBuscarCreditoPendiente({ nombres: busqueda });
        setPrestamosPendientes(creditos);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al buscar crédito:", error);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBuscarCredito(busqueda);
      console.log('Buscando crédito:', busqueda);
    }
  }

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor === '') {
      setLoading(true);
      if (vista === 'creditosAprobados') {
        getPrestamosAprobados().then(data => {
          setPrestamosAprobados(data);
          setLoading(false);
        });
      } else if (vista === 'creditosPendientes') {
        getPrestamosPendientes().then(data => {
          setPrestamosPendientes(data);
          setLoading(false);
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center  px-[68px] py-[30px]">
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
                width={'300px'}
                value={busqueda}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                botonVisible={true}
                textoBoton={'Buscar'}
                colorBoton={'#208768'}
                onClickBoton={() => handleBuscarCredito(busqueda)}
              />
              <BotonNormal texto="CREAR CRÉDITO" width={'auto'} height={'40px'} color={'#208768'} hover={'#166653'} onClick={() => handleFrameElegirCliente(true)} />
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
                width={'300px'}
                value={busqueda}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                botonVisible={true}
                textoBoton={'Buscar'}
                colorBoton={'#208768'}
                onClickBoton={() => handleBuscarCredito(busqueda)}
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
