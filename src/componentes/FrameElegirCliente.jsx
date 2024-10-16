import { useEffect, useState, useMemo, useCallback } from "react";
import BotonNormal from "./Atomos/BotonNormal";
import InputEtiqueta from "./Atomos/InputEtiqueta";
import Overlay from "./Overlay";
import FooterFrames from "./Moleculas/FooterFrames";
import FilaCliente, { FilaClienteSkeleton } from './Moleculas/FilaCliente';
import TimeLine from "./Moleculas/TimeLine";
import { getPersonas, postCrearPersona } from "../hooks/personas";
import { getTablaAmortizacion, postCrearCredito, patchActualizarCredito } from "../hooks/creditos";
import { validarCamposLlenos } from "../utils/funGlobales";
import { useNavigate } from "react-router-dom";
import { PATH_CREDITOS } from "../routes/paths";
import { message } from "antd";

function FrameElegirCliente({ handleClickCerrarFrameElegirCliente, editMode, credito, cliente }) {

  const [crearCliente, setCrearCliente] = useState(false);
  const [current, setCurrent] = useState(editMode ? 1 : 0);
  const [forceValidate, setForceValidate] = useState(false);
  const [errorSeleccionCliente, setErrorSeleccionCliente] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [originalPersonas, setOriginalPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCrearCredito, setLoadingCrearCredito] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const [nuevoCredito, setNuevoCredito] = useState({
    monto: editMode ? credito.capitalCredito : '',
    tiempo: editMode ? credito.tiempo : '',
    interes: editMode ? credito.interesCredito : ''
  })
  const [nuevoCliente, setNuevoCliente] = useState({
    cedula: editMode ? cliente.cedula : '',
    correo: editMode ? cliente.correo : '',
    nombres: editMode ? cliente.nombres : '',
    apellidos: editMode ? cliente.apellidos : '',
    telefono: editMode ? cliente.telefono : '',
    direccion: editMode ? cliente.direccion : ''
  })

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const handleCrearCliente = () => {
    // Al iniciar la creación de un nuevo cliente, limpia los campos y la validación
    setNuevoCliente({
      cedula: '',
      correo: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      direccion: ''
    });
    setForceValidate(false);  // Limpia cualquier validación forzada previa
    setCrearCliente(true);
  };

  const handleCerrarFrame = () => {
    if (current === 1) {
      prev();
    } else if (crearCliente) {
      setCrearCliente(false);
    } else {
      handleClickCerrarFrameElegirCliente();
    }
  };

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
        seleccionado={personaSeleccionada?.idPersona === persona.idPersona}
      />
    ));
  }, [personas, personaSeleccionada, loading]);

  const seleccionarPersona = useCallback((persona) => {
    setPersonaSeleccionada(persona)
  }, []);

  const handleCrearCredito = async () => {
    setLoadingCrearCredito(true);
    try {
      const { success, idPersona, clienteData } = await handleCliente();

      if (!success) {
        message.error('Error al obtener los datos del cliente');
        return;
      }

      const datosCredito = {
        idPersona,
        capitalCredito: parseFloat(nuevoCredito.monto),
        tiempo: parseInt(nuevoCredito.tiempo),
        interesCredito: parseFloat(nuevoCredito.interes),
        fechaCreacion: new Date().toISOString(),
      };

      let creditoResponse;
      if (editMode) {
        creditoResponse = await patchActualizarCredito(credito.idCredito, datosCredito);
      } else {
        creditoResponse = await postCrearCredito(datosCredito);
      }

      if (creditoResponse?.idCredito || creditoResponse?.credito?.idCredito) {
        const idCredito = creditoResponse.idCredito || creditoResponse.credito.idCredito;
        const tablaAmortizacion = await getTablaAmortizacion(idCredito);
        navigate(`${PATH_CREDITOS}/${idCredito}`, {
          state: {
            tablaAmortizacion,
            clienteCreado: clienteData,
            creditoCreado: editMode ? creditoResponse.credito : creditoResponse,
          },
        });

        if (editMode) {
          message.success('Crédito actualizado con éxito');
        } else {
          message.success('Crédito creado con éxito');
        }
        
        handleClickCerrarFrameElegirCliente();
      } else {
        throw new Error('Error al procesar el crédito');
      }
    } catch (error) {
      console.error('Error en handleCrearCredito:', error);
      message.error('Error al crear o actualizar crédito');
    } finally {
      setLoadingCrearCredito(false);
    }
  };

  const handleCliente = async () => {
    try {
      let idPersona = null;
      let clienteData = null;

      if (crearCliente) {
        const clienteCreado = await postCrearPersona(nuevoCliente);
        if (clienteCreado?.idPersona) {
          idPersona = clienteCreado.idPersona;
          clienteData = { ...nuevoCliente, idPersona };
        } else {
          throw new Error('Error al crear cliente');
        }
      } else if (personaSeleccionada) {
        idPersona = personaSeleccionada.idPersona;
        clienteData = personaSeleccionada;
      } else if (editMode) {
        idPersona = cliente.idPersona;
        clienteData = cliente;
      }

      if (!idPersona) {
        throw new Error('No se ha seleccionado o creado un cliente');
      }

      return { success: true, idPersona, clienteData };
    } catch (error) {
      console.error('Error en handleCliente:', error);
      return { success: false };
    }
  };

  const handleSiguiente = () => {
    setForceValidate(true);  // Forzar la validación solo en el momento de avanzar

    if (current === 0) {
      if (crearCliente) {
        const camposCliente = Object.values(nuevoCliente);
        if (!validarCamposLlenos(camposCliente)) {
          return;  // Evita avanzar si los campos están incompletos
        }
      } else {
        if (!personaSeleccionada) {
          setErrorSeleccionCliente(true);
          return;  // Evita avanzar si no se ha seleccionado un cliente
        } else {
          setErrorSeleccionCliente(false);
        }
      }
    } else if (current === 1) {
      const camposCredito = Object.values(nuevoCredito);
      if (!validarCamposLlenos(camposCredito)) {
        return;  // Evita avanzar si los campos de crédito están incompletos
      }
    }

    // Solo si la validación fue exitosa, resetea el estado de validación y avanza
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
              {!crearCliente && !editMode ? (
                <>
                  <span className="font-bold">Beneficiario: <span className="font-normal">{`${personaSeleccionada.nombres} ${personaSeleccionada.apellidos}`}</span></span>
                  <span className="font-bold">Cédula de identidad: <span className="font-normal">{personaSeleccionada.cedula}</span></span>
                  <span className="font-bold">Teléfono: <span className="font-normal">{personaSeleccionada.telefono}</span></span>
                  <span className="font-bold">Dirección: <span className="font-normal">{personaSeleccionada.direccion}</span></span>
                </>
              ) : !crearCliente && editMode ? (
                <>
                  <span className="font-bold">Beneficiario: <span className="font-normal">{`${cliente.nombres} ${cliente.apellidos}`}</span> </span>
                  <span className="font-bold">Cédula de identidad: <span className="font-normal">{cliente.cedula}</span></span>
                  <span className="font-bold">Teléfono: <span className="font-normal">{cliente.telefono}</span> </span>
                  <span className="font-bold">Dirección: <span className="font-normal">{cliente.direccion}</span> </span>
                </>
              ) : (
                <>
                  <span className="font-bold">Beneficiario: <span className="font-normal">{`${nuevoCliente.nombres} ${nuevoCliente.apellidos}`}</span></span>
                  <span className="font-bold">Cédula de identidad: <span className="font-normal">{nuevoCliente.cedula}</span></span>
                  <span className="font-bold">Teléfono: <span className="font-normal">{nuevoCliente.telefono}</span></span>
                  <span className="font-bold">Dirección: <span className="font-normal">{nuevoCliente.direccion}</span></span>
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
            onClick={editMode ? handleClickCerrarFrameElegirCliente : handleCerrarFrame}
            handleSiguiente={handleSiguiente}
            editMode={editMode}
            loading={loadingCrearCredito}
          />
        </div>
      </div>
    </Overlay >
  );
}

export default FrameElegirCliente;
