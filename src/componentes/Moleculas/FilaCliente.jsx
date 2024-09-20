
function FilaCliente({ nombre, cedula, onClick, seleccionado }) {

  return (
    <div 
      className={`flex items-center justify-around h-[50px] px-[20px] border-y border-y-Gris w-full cursor-pointer ${seleccionado ? 'bg-Gris rounded-[10px]' : 'hover:bg-Gris hover:rounded-[10px]'}`}
      onClick={onClick}  
    >
      <span className="font-bold w-2/3 truncate">{nombre}</span>
      <span>C.I {cedula}</span>
    </div>
  )
}

export default FilaCliente;