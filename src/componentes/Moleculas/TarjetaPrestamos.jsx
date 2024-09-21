import { Skeleton } from 'antd';

function TarjetaPrestamo({ nombreCliente, cedulaCliente, cuotasRestantes, saldoPendiente, onClick }) {

  return (
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
  );
}

function TarjetaPrestamoSkeleton() {
  return (
    <div className="h-[136px] w-[307px] p-[15px] flex flex-col rounded-[10px] bg-white shadow-3xl">
      <Skeleton.Input active size="large" style={{ width: '100%', marginBottom: '5px' }} />
      <Skeleton.Input active size="small" style={{ width: '80%', marginBottom: '10px' }} />

      <section className="mt-[5px] flex justify-between">
        <div className="flex flex-col">
          <Skeleton.Input active size="small" style={{ width: '100px', marginBottom: '4px' }} />
        </div>
        <Skeleton.Button active size="small" style={{ width: '140px' }} />
      </section>
    </div>
  )
}

export default TarjetaPrestamo;
export { TarjetaPrestamoSkeleton };
