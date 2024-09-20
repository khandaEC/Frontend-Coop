
function BotonNavbar({ text, onClick, activo, icono }) {
  return (
    <li
      className={`h-[50px] flex items-center px-[20px] cursor-pointer ${activo ? 'border-b-2 border-black font-bold' : ''}`}
      onClick={onClick}
    >{text}</li>
  )
}

export default BotonNavbar;