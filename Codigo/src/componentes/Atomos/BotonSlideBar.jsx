
function BotonSlidebar({ Texto, Icono, activo }) {
  return(
    <button className= {`flex items-center px-[15px] w-full h-[50px] gap-2 rounded-[10px] text-white my-2 ${activo ? 'bg-RojoSlide shadow-2xl font-bold' : 'bg-transparent hover:bg-RojoSlide hover:font-bold hover:shadow-2xl'}`}>
      {Icono}
      {Texto}
    </button>
  )
}

export default BotonSlidebar;