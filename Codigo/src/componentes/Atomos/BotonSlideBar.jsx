
function BotonSlidebar({ Texto, Icono }) {
  return(
    <button className="flex items-center px-[15px] w-[285px] h-[50px] gap-5 bg-transparent rounded-[10px] text-white hover:bg-RojoSlide hover:font-bold">
      {Icono}
      {Texto}
    </button>
  )
}

export default BotonSlidebar;