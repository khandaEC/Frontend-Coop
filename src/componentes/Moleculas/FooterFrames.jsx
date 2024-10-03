import BotonNormal from "../Atomos/BotonNormal";
import BotonIcono from "../Atomos/BotonIcono";
import IconFechaAtras from "../../assets/IconFlechaAtras";

function FooterFrames({ onClick, handleSiguiente, current, editMode }) {
  return (
    <div className="w-full h-[70px] bg-Fondo flex justify-around items-center rounded-b-[20px]">
      <BotonIcono
        texto={editMode ? "REGRESAR" : "ANTERIOR"}
        width={'140px'}
        iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />}
        onClick={onClick}
      />
       <BotonNormal 
        texto={
          editMode 
          ? "EDITAR DATOS" 
          : current === 0 
            ? "SIGUIENTE" 
            : current === 1 
              ? "CREAR CRÉDITO" 
              : "CREAR CLIENTE"
        } 
        width={'auto'} 
        height={'44px'} 
        color={'#208768'} 
        hover={'#166653'} 
        onClick={handleSiguiente} 
      />
    </div>
  );
}

export default FooterFrames;