
function TarjetaAbono({ cuota, valorCuota, color, fontColor }) {
  return (
    <div className="p-[10px] flex flex-col items-center justify-center rounded-[10px] shadow-3xl max-w-[90px] w-[90px] h-[90px]  "
      style={{ backgroundColor: color, color: fontColor }}
    >
      <span>Cuota {cuota}</span>
      <span className="font-bold">${valorCuota}</span>
    </div>
  )
}

export default TarjetaAbono;