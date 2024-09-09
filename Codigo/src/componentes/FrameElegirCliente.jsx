import { useEffect, useState, useMemo } from "react";
import BotonNormal from "./Atomos/BotonNormal";
import InputEtiqueta from "./Atomos/InputEtiqueta";
import Overlay from "./Overlay";
import FooterFrames from "./Moleculas/FooterFrames";
import FilaCliente from "./Moleculas/FilaCliente";
import TimeLine from "./Moleculas/TimeLine";
import { getPersonas } from "../hooks/personas";

function FrameElegirCliente({ handleClickCerrarFrameElegirCliente }) {

  const [crearCliente, setCrearCliente] = useState(false);
  const [current, setCurrent] = useState(0);
  const [personas, setPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const handleCrearCliente = () => {
    setCrearCliente(true);
  }

  const handleCerrarFrame = () => {
    if (current === 1) {
      prev()
    } else if(crearCliente) {
      setCrearCliente(false)
    } else if(handleClickCerrarFrameElegirCliente) {
      handleClickCerrarFrameElegirCliente()
    }
  }

  useEffect(() => {
    getPersonas().then(data => {
      setPersonas(data)
      console.log(data)
    })
  }, [])

  const memorizarPersonas = useMemo(() => {
    return personas.map((persona) => (
      <FilaCliente 
        key={persona.idPersona} 
        nombre={`${persona.nombres} ${persona.apellidos}`} 
        cedula={persona.cedula} 
        onClick={() => seleccionarPersona(persona)}
        seleccionado={personaSeleccionada === persona}
      />
    ));
  }, [personas, personaSeleccionada]);

  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona)
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
                    height={'44px'}
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
                  />
                </span>
                <div className="overflow-y-auto w-full h-[200px] no-scrollbar">
                  {memorizarPersonas}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-[10px] mt-[15px]">
                  <span className="font-bold text-2xl">Datos del cliente</span>
                  <InputEtiqueta etiqueta="Cédula" type="number" placeholder="ej. 0404040404" width={'433px'} />
                  <div className="flex justify-around">
                    <InputEtiqueta etiqueta="Nombres" type="text" placeholder="ej. Jose David" width={'210px'} />
                    <InputEtiqueta etiqueta="Apellidos" type="text" placeholder="ej. Teran Ramos" width={'210px'} />
                  </div>
                  <div className="flex justify-around">
                    <InputEtiqueta etiqueta="Teléfono" type="number" placeholder="ej. 0909090909" width={'210px'} />
                    <InputEtiqueta etiqueta="Dirección" type="text" placeholder="ej. Atanasio Oleas" width={'210px'} />
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
              <span className="font-bold ">Beneficiario:<span className="font-normal"> {`${personaSeleccionada.nombres} ${personaSeleccionada.apellidos}`} </span></span>
              <span className="font-bold ">Cédula de identidad:<span className="font-normal"> {personaSeleccionada.cedula}</span></span>
              <span className="font-bold ">Teléfono:<span className="font-normal"> {personaSeleccionada.telefono}</span></span>
              <span className="font-bold ">Dirección:<span className="font-normal"> {personaSeleccionada.direccion}</span></span>
            </div>
            <div className="flex flex-col gap-[10px] mt-[15px]">
              <span className="font-bold text-2xl">Datos del crédito</span>
              <InputEtiqueta etiqueta="Monto" type="number" placeholder="ej. 3000 $" width={'433px'} />
              <div className="flex justify-around">
                <InputEtiqueta etiqueta="Tiempo" type="number" placeholder="ej. 12 meses" width={'210px'} />
                <InputEtiqueta etiqueta="Interés" type="number" placeholder="ej. 2 %" width={'210px'} />
              </div>
            </div>
          </>
        )}
        <div className="w-full absolute bottom-0 z-10">
          <FooterFrames
            current={current}
            onClick={handleCerrarFrame}
            handleSiguiente={current === 0 ? next : handleClickCerrarFrameElegirCliente} />
        </div>
      </div>
    </Overlay>
  );
}

export default FrameElegirCliente;
