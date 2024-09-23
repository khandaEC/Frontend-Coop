

function BotonIcono({ iconoDerecha, iconoIzquierda, texto, onClick, width }) {
  return(
    <button 
      className="flex items-center justify-center h-[44px] bg-transparent text-[#5A6268] font-bold"
      style={{ width: width }}
      onClick={onClick}
    >
      <span className="pr-3 border">{iconoIzquierda}</span>
      <span>{texto}</span>
      <span className="pl-3">{iconoDerecha}</span>
    </button>
  )
}

export default BotonIcono;