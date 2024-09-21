import '../../index.css'

function BotonNormal({ texto, onClick, width, height, color, hover }) {
  return(
    <button 
      className={` rounded-[10px] px-[20px] py-[10px] text-white font-bold shadow-3xl btn-normal`}
      style={{ backgroundColor: color, width: width, height: height, '--hover-color': hover }}
      onClick={onClick}  
    >
      {texto}
    </button>
  )
}

export default BotonNormal;