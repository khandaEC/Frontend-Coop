import BotonNormal from "../Atomos/BotonNormal";
import BotonIcono from "../Atomos/BotonIcono";
import IconFechaAtras from "../../assets/IconFlechaAtras";

function FooterFrames({ onClick }) {
  return (
    <div className="w-full h-[70px] bg-transparent flex justify-around">
      <BotonIcono texto="ANTERIOR" width={'140px'} iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />} onClick={onClick} />
      <BotonNormal texto="SIGUIENTE" width={'auto'} height={'44px'} color={'#208768'} hover={'#166653'} />
    </div>
  );
}

export default FooterFrames;