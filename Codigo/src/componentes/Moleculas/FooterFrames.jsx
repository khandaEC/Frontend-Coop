import BotonNormal from "../Atomos/BotonNormal";
import BotonIcono from "../Atomos/BotonIcono";
import IconFechaAtras from "../../assets/IconFlechaAtras";

function FooterFrames({ onClick, handleSiguiente, current }) {
  return (
    <div className="w-full h-[70px] bg-Fondo flex justify-around items-center rounded-b-[20px]">
      <BotonIcono texto="ANTERIOR" width={'140px'} iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />} onClick={onClick} />
      <BotonNormal texto={`${current === 0 ? 'SIGUIENTE' : 'CREAR CLIENTE' || current === 1 ? 'CREAR CRÉDITO' : ''}`} width={'auto'} height={'44px'} color={'#208768'} hover={'#166653'} onClick={handleSiguiente} />
    </div>
  );
}

export default FooterFrames;