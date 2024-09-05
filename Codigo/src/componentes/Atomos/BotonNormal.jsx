
function BotonNormal({ texto, onClick, width, height }) {
  return(
    <button 
      className={`bg-Verde rounded-[10px] px-[20px] py-[10px] text-white font-bold w-[${width}] h-[${height}] shadow-3xl hover:bg-[#166653] `}
      onClick={onClick}  
    >
      {texto}
    </button>
  )
}

export default BotonNormal;