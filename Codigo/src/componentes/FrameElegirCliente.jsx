import BotonNormal from "./Atomos/BotonNormal";
import InputEtiqueta from "./Atomos/InputEtiqueta";
import Overlay from "./Overlay";
import FooterFrames from "./Moleculas/FooterFrames";

function FrameElegirCliente({ handleClickCerrarFrameElegirCliente }) {
  return (
    <Overlay>
      <div className="relative p-6 rounded-[20px] shadow-3xl flex flex-col items-center bg-white z-50">
        <BotonNormal texto="CREAR CLIENTE" width={'433px'} height={'44px'} color={'#208768'} hover={'#166653'} />
        <InputEtiqueta etiqueta="Buscar cliente" type="text" placeholder="ej. 0401010101" />
        <FooterFrames onClick={handleClickCerrarFrameElegirCliente} />
      </div>
    </Overlay>
  );
}

export default FrameElegirCliente;
