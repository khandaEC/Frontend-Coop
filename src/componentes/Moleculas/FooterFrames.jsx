import BotonNormal from "../Atomos/BotonNormal";
import BotonIcono from "../Atomos/BotonIcono";
import IconFechaAtras from "../../assets/IconFlechaAtras";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function FooterFrames({ onClick, handleSiguiente, current, editMode, loading }) {
  return (
    <div className="w-full h-[70px] bg-Fondo flex justify-around items-center rounded-b-[20px]">
      <BotonIcono
        texto={editMode ? "REGRESAR" : "ANTERIOR"}
        width={'140px'}
        iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />}
        onClick={onClick}
      />
      <Spin spinning={loading} indicator={<LoadingOutlined spin />} >
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
      </Spin>
    </div>
  );
}

export default FooterFrames;