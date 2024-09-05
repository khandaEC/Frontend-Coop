import BotonNormal from "../Atomos/BotonNormal";

function TarjetaPrestamoPendiente({ nombreCliente, cedulaCliente }) {
  return(
    <div className="h-[136px] w-[307px] p-[15px] flex flex-col rounded-[10px] bg-white shadow-3xl">
      <span className="font-bold text-AzulSlide text-2xl truncate">{nombreCliente}</span>
      <span>{cedulaCliente}</span>
      <section className="mt-[10px] flex justify-between">
        <BotonNormal texto="ACEPTAR" width={'132px'} height={'44px'} color={'#208768'} hover={'#166653'}/>
        <BotonNormal texto="ELIMINAR" width={'132px'} height={'44px'} color={'#C82333'} hover={''}/>
      </section>
    </div>
  )
}

export default TarjetaPrestamoPendiente;