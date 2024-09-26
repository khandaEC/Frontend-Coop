import { useEffect, useState, useMemo, useCallback } from "react";
import BotonNormal from "./Atomos/BotonNormal";
import InputEtiqueta from "./Atomos/InputEtiqueta";
import Overlay from "./Overlay";
import FooterFrames from "./Moleculas/FooterFrames";
import FilaCliente, { FilaClienteSkeleton } from './Moleculas/FilaCliente';
import TimeLine from "./Moleculas/TimeLine";
import { getPersonas, postCrearPersona } from "../hooks/personas";
import { getTablaAmortizacion, postCrearCredito } from "../hooks/creditos";
import { validarCamposLlenos } from "../utils/funGlobales";
import { useNavigate } from "react-router-dom";
import { PATH_CREDITOS } from "../routes/paths";

function FrameElegirCliente({ handleClickCerrarFrameElegirCliente }) {

  const [crearCliente, setCrearCliente] = useState(false);
  const [current, setCurrent] = useState(0);
  const [forceValidate, setForceValidate] = useState(false);
  const [errorSeleccionCliente, setErrorSeleccionCliente] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [originalPersonas, setOriginalPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const [nuevoCredito, setNuevoCredito] = useState({
    monto: '',
    tiempo: '',
    interes: ''
  })
  const [nuevoCliente, setNuevoCliente] = useState({
    cedula: '',
    correo: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: ''
  })

  const next = useCallback(() => setCurrent((prev) => prev + 1), []);
  const prev = useCallback(() => setCurrent((prev) => prev - 1), []);

  const handleCrearCliente = () => setCrearCliente(true);

  const handleCerrarFrame = useCallback(() => {
    if (current === 1) {
      prev()
    } else if (crearCliente) {
      setCrearCliente(false)
    } else if (handleClickCerrarFrameElegirCliente) {
      handleClickCerrarFrameElegirCliente()
    }
  }, [current, crearCliente, handleClickCerrarFrameElegirCliente, prev]);

  useEffect(() => {
    const fetchPersonas = async () => {
      setLoading(true);
      try {
        const data = await getPersonas();
        setPersonas(data);
        setOriginalPersonas(data);
      } catch (error) {
        console.error("Error fetching personas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  const memorizarPersonas = useMemo(() => {

    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => <FilaClienteSkeleton key={index} />);
    }

    return personas.map((persona) => (
      <FilaCliente
        key={persona.idPersona}
        nombre={`${persona.nombres} ${persona.apellidos}`}
        cedula={persona.cedula}
        onClick={() => seleccionarPersona(persona)}
        seleccionado={personaSeleccionada === persona}
      />
    ));
  }, [personas, personaSeleccionada, loading]);

  const seleccionarPersona = useCallback((persona) => {
    setPersonaSeleccionada(persona)
  }, []);

  const handleCrearCredito = async () => {
    try {
      const clienteResponse = await handleCliente();

      if (!clienteResponse.success) {
        alert(clienteResponse.message);
        return;
      }

      const { idPersona, clienteData } = clienteResponse;

      const datosCredito = {
        idPersona: idPersona,
        capitalCredito: parseFloat(nuevoCredito.monto),
        tiempo: parseInt(nuevoCredito.tiempo),
        interesCredito: parseFloat(nuevoCredito.interes),
        fechaCreacion: new Date().toISOString(),
      };

      const creditoCreado = await postCrearCredito(datosCredito);
      if (creditoCreado?.idCredito) {
        const tablaAmortizacion = await getTablaAmortizacion(creditoCreado.idCredito);
        navigate(`${PATH_CREDITOS}/${creditoCreado.idCredito}`, {
          state: {
            tablaAmortizacion,
            clienteCreado: clienteData,
            creditoCreado,
          },
        });
      } else {
        throw new Error('Error al crear crédito');
      }
    } catch (error) {
      console.log('Error en handleCrearCredito:', error);
      alert('Error al crear crédito');
    }
  };

  const handleCliente = async () => {
    let idPersona = null;
    let clienteData = null;

    if (crearCliente) {
      const clienteCreado = await postCrearPersona(nuevoCliente);
      if (clienteCreado?.idPersona) {
        idPersona = clienteCreado.idPersona;
        clienteData = { ...nuevoCliente, idPersona: clienteCreado.idPersona };
      } else {
        throw new Error('Error al crear cliente');
      }
    } else if (personaSeleccionada) {
      idPersona = personaSeleccionada.idPersona;
      clienteData = personaSeleccionada;
    }

    if (!idPersona) {
      throw new Error('No se ha seleccionado o creado un cliente');
    }

    return { success: true, idPersona, clienteData };
  };

  const handleSiguiente = () => {
    setForceValidate(true);

    if (current === 0) {
      if (crearCliente) {
        const camposCliente = Object.values(nuevoCliente);
        if (!validarCamposLlenos(camposCliente)) {
          return;
        }
      } else {
        if (!personaSeleccionada) {
          setErrorSeleccionCliente(true);
          return;
        } else {
          setErrorSeleccionCliente(false);
        }
      }
    } else if (current === 1) {
      const camposCredito = Object.values(nuevoCredito);
      if (!validarCamposLlenos(camposCredito)) {
        return;
      }
    }

    setForceValidate(false);
    if (current === 0) {
      next();
    } else {
      handleCrearCredito();
    }
  };

  const handleBuscarPersona = (e) => {
    const busqueda = e.target.value;
    setBusqueda(busqueda);

    if (busqueda === '') {
      setPersonas(originalPersonas);
      return;
    }

    const personasFiltradas = originalPersonas.filter((persona) =>
      persona.cedula.includes(busqueda) ||
      `${persona.nombres} ${persona.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    setPersonas(personasFiltradas);
  }


  return (
    <Overlay>
      <div className="relative p-6 rounded-[20px] shadow-3xl flex flex-col items-center bg-Fondo z-50 pb-[100px]">
        <TimeLine current={current} />
        {current === 0 && (
          <>
            {!crearCliente ? (
              <>
                <span className="mt-[10px]">
                  <BotonNormal
                    texto="CREAR CLIENTE"
                    width={'433px'}
                    height={'40px'}
                    color={'#208768'}
                    hover={'#166653'}
                    onClick={handleCrearCliente}
                  />
                </span>
                <span className="mt-[25px] mb-[20px]">
                  <InputEtiqueta
                    etiqueta="Buscar cliente"
                    type="text"
                    placeholder="ej. 0401010101"
                    width={'433px'}
                    value={busqueda}
                    onChange={handleBuscarPersona}
                  />
                </span>
                <div className="overflow-y-auto w-full h-[200px] no-scrollbar">
                  {memorizarPersonas}
                </div>
                {errorSeleccionCliente && (
                  <span className="text-xs text-red-500 mt-2">
                    Por favor seleccione un cliente.
                  </span>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-col gap-[10px] mt-[15px]">
                  <span className="font-bold text-2xl">Datos del cliente</span>
                  <div className="flex justify-around gap-[10px]">
                    <InputEtiqueta
                      etiqueta="Cédula"
                      type="number"
                      placeholder="ej. 0404040404"
                      width={'210px'}
                      value={nuevoCliente.cedula}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, cedula: e.target.value })}
                      forceValidate={forceValidate}
                    />
                    <InputEtiqueta
                      etiqueta="Correo"
                      type="email"
                      placeholder="ej. correo@correo.com "
                      width={'210px'}
                      value={nuevoCliente.correo}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
                      forceValidate={forceValidate}
                    />
                  </div>
                  <div className="flex justify-around gap-[10px]">
                    <InputEtiqueta
                      etiqueta="Nombres"
                      type="text"
                      placeholder="ej. Jose David"
                      width={'210px'}
                      value={nuevoCliente.nombres}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombres: e.target.value })}
                      forceValidate={forceValidate}
                    />
                    <InputEtiqueta
                      etiqueta="Apellidos"
                      type="text"
                      placeholder="ej. Teran Ramos"
                      width={'210px'}
                      value={nuevoCliente.apellidos}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, apellidos: e.target.value })}
                      forceValidate={forceValidate}
                    />
                  </div>
                  <div className="flex justify-around gap-[10px]">
                    <InputEtiqueta
                      etiqueta="Teléfono"
                      type="number"
                      placeholder="ej. 0909090909"
                      width={'210px'}
                      value={nuevoCliente.telefono}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                      forceValidate={forceValidate}
                    />
                    <InputEtiqueta
                      etiqueta="Dirección"
                      type="text"
                      placeholder="ej. Atanasio Oleas"
                      width={'210px'}
                      value={nuevoCliente.direccion}
                      requerido={true}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
                      forceValidate={forceValidate}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {current === 1 && (
          <>
            <div className="w-full bg-white border border-Gris rounded-[10px] px-[20px] py-[10px] flex flex-col mt-[10px]">
              <span className="font-bold text-2xl">Datos del cliente</span>
              {!crearCliente ? (
                <>
                  <span className="font-bold ">Beneficiario:<span className="font-normal"> {`${personaSeleccionada.nombres} ${personaSeleccionada.apellidos}`} </span></span>
                  <span className="font-bold ">Cédula de identidad:<span className="font-normal"> {personaSeleccionada.cedula} </span></span>
                  <span className="font-bold ">Teléfono:<span className="font-normal"> {personaSeleccionada.telefono} </span></span>
                  <span className="font-bold ">Dirección:<span className="font-normal"> {personaSeleccionada.direccion}</span></span>
                </>
              ) : (
                <>
                  <span className="font-bold ">Beneficiario:<span className="font-normal"> {`${nuevoCliente.nombres} ${nuevoCliente.apellidos}`} </span></span>
                  <span className="font-bold ">Cédula de identidad:<span className="font-normal"> {nuevoCliente.cedula} </span></span>
                  <span className="font-bold ">Teléfono:<span className="font-normal"> {nuevoCliente.telefono} </span></span>
                  <span className="font-bold ">Dirección:<span className="font-normal"> {nuevoCliente.direccion}</span></span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-[10px] mt-[15px]">
              <span className="font-bold text-2xl">Datos del crédito</span>
              <InputEtiqueta
                etiqueta="Monto"
                type="number"
                placeholder="ej. $ 3000.00"
                width={'433px'}
                value={nuevoCredito.monto}
                requerido={true}
                onChange={(e) => setNuevoCredito({ ...nuevoCredito, monto: e.target.value })}
                forceValidate={forceValidate}
              />
              <div className="flex justify-around">
                <InputEtiqueta
                  etiqueta="Tiempo"
                  type="number"
                  placeholder="ej. 12 meses"
                  width={'210px'}
                  value={nuevoCredito.tiempo}
                  requerido={true}
                  onChange={(e) => setNuevoCredito({ ...nuevoCredito, tiempo: e.target.value })}
                  forceValidate={forceValidate}
                />
                <InputEtiqueta
                  etiqueta="Interés"
                  type="number"
                  placeholder="ej. 2%"
                  width={'210px'}
                  value={nuevoCredito.interes}
                  requerido={true}
                  onChange={(e) => setNuevoCredito({ ...nuevoCredito, interes: e.target.value })}
                  forceValidate={forceValidate}
                />
              </div>
            </div>
          </>
        )}

        <div className="w-full absolute bottom-0 z-10">
          <FooterFrames
            current={current}
            onClick={handleCerrarFrame}
            handleSiguiente={handleSiguiente} />
        </div>
      </div>
    </Overlay >
  );
}

export default FrameElegirCliente;
