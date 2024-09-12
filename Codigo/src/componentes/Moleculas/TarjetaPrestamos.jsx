import { useNavigate } from "react-router-dom";

function TarjetaPrestamo({ nombreCliente, cedulaCliente, cuotasRestantes, saldoPendiente, onClick }) {

  const navigate = useNavigate();

  const handleClicDetallePresatamo = () => {
    navigate(`/creditos/${idCredito}`)
  }

  return(
    <div className="h-[136px] w-[307px] p-[15px] flex flex-col rounded-[10px] bg-white shadow-3xl cursor-pointer" onClick={onClick}>
      <span className="font-bold text-AzulSlide text-2xl truncate">{nombreCliente}</span>
      <span>{cedulaCliente}</span>
      <section className="mt-[10px] flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm">Cuotas Restantes</span>
          <span className="font-bold">{cuotasRestantes} Meses</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Saldo Pendiente</span>
          <span className="font-bold">$ {saldoPendiente}</span> 
        </div>
      </section>
    </div>
  )
}

export default TarjetaPrestamo;