import { useMemo, useState, useCallback, useEffect } from "react";
import Overlay from "./Overlay";
import InputEtiqueta from "./Atomos/InputEtiqueta";
import BotonNormal from "./Atomos/BotonNormal";
import IconFlechaDerecha from "../assets/IconFlechaDerecha";
import TarjetaAbono from "./Moleculas/TarjetaAbono";
import { postCalcularAbono, postPagarAbono } from "../hooks/creditos";

function FramePagarCuota({ cliente, credito, cuotasTabla, handleFramePagarCuota }) {

  const [montoAbono, setMontoAbono] = useState('');
  const [abono, setAbono] = useState([]);

  const handleCalcularCuota = useCallback(async () => {

    if (isNaN(parseFloat(montoAbono)) || parseFloat(montoAbono) <= 0 || parseFloat(montoAbono) > calcularMontoRestante) {
      alert('El monto ingresado no es válido');
      return;
    }

    const dataAbono = {
      idCredito: credito.idCredito,
      cantidadAbono: parseFloat(montoAbono) || 0
    };
    try {
      const data = await postCalcularAbono(dataAbono);
      setAbono(data.detallesAbonos || []);
    } catch (error) {
      console.error('Error al calcular abono', error);
    }
  }, [credito.idCredito, montoAbono]);

  const cuotaConDiferencia = useMemo(() => {
    if (!abono || abono.length === 0) {
      return { ultimaCuotaAlcanzada: null, diferencia: 0 };
    }

    const lastDetalle = abono[abono.length - 1];

    const cuotaTotal = cuotasTabla.find(cuota => cuota.cuota === lastDetalle.cuota)?.total || 0;
    const diferencia = cuotaTotal - lastDetalle.abono;

    return { ultimaCuotaAlcanzada: lastDetalle.cuota, diferencia };
  }, [abono, cuotasTabla]);

  const handlePagarAbono = useCallback(async () => {
    const dataAbono = {
      idCredito: credito.idCredito,
      cantidadAbono: parseFloat(montoAbono),
      fechaAbono: new Date().toISOString(),
      descripcion: "pruebas",
    };
    try {
      const data = await postPagarAbono(dataAbono);
      console.log('Respuesta del servidor:', data);
      handleFramePagarCuota(false);
    } catch (error) {
      console.error('Error al pagar abono', error);
    }
  })

  const calcularMontoRestante = useMemo(() => {
    let totalRestante = 0

    for (const cuota of cuotasTabla) {
      const totalCuota = cuota.total
      let totalAbonoCuota = 0

      if (cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
        totalAbonoCuota = cuota.detallesAbonos.reduce((sum, abonoDetalle) => sum + abonoDetalle.abono, 0)
      }

      const diferenciaCuota = totalCuota - totalAbonoCuota
      totalRestante += diferenciaCuota > 0 ? diferenciaCuota : 0
    }

    return totalRestante
  }, [cuotasTabla])

  const handlePagarPrestamoCompleto = useCallback(async () => {
    const cantidadAbono = calcularMontoRestante
    setMontoAbono(cantidadAbono)
  }, [calcularMontoRestante, handleCalcularCuota]);

  const ponerBordeTarjetaAbono = (cuota) => {
    const detalleAbono = abono.find((detalle) => detalle.cuota === cuota);
    if (detalleAbono) {
      if (detalleAbono.diferencia > 0) {
        return '#FFD700';
      } else {
        return '#208768';
      }
    } else {
      return '#d9d9d9';
    }
  }

  const determinarColor = (cuota) => {
    if (cuota.detallesAbonos.length > 0 && cuota.detallesAbonos[0].diferencia > 0) {
      return '#FFD700';
    } else if (cuota.detallesAbonos.length > 0 && cuota.detallesAbonos[0].diferencia === 0) {
      return '#208768';
    } else {
      return '#D3D3D3';
    }
  };

  return (
    <Overlay>
      <div className="bg-Fondo z-50 py-[20px] px-[30px] rounded-[10px] shadow-3xl flex flex-col items-center justify-center max-w-[70%]">
        <span className='text-AzulSlide font-bold text-3xl'>Préstamo {cliente.nombres} {cliente.apellidos}</span>
        <span className='font-bold text-xl'>Cédula de identidad No. {cliente.cedula}</span>
        <section className="flex w-full items-center justify-between mt-[20px]">
          <div className="flex flex-col gap-[10px] mr-5 ">
            <InputEtiqueta
              etiqueta="Valor a abonar"
              type="number"
              placeholder="ej. $100.00"
              width={300}
              value={montoAbono}
              onChange={(e) => setMontoAbono(e.target.value)}
            />
            <span className=" font-bold text-center cursor-pointer rounded-[10px] hover:text-Verde " onClick={handlePagarPrestamoCompleto}>Pagar prestamo {calcularMontoRestante}</span>
            <BotonNormal texto="CALCULAR ABONO" width="300px" height="40px" color="#208768" hover="#166653" onClick={handleCalcularCuota} />
          </div>
          <IconFlechaDerecha width="40px" height="40px" color="#208768" />
          <div className="bg-white rounded-lg shadow-md p-5 border border-Gris max-h-[200px] overflow-y-auto scrollbar-thin ml-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-2 font-bold">Cuota</th>
                  <th className="px-4 py-2 font-bold">Valor cuota</th>
                  <th className="px-4 py-2 font-bold">Valor cancela</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-Gris">
                {abono.map((detalle, index) => (
                  <tr key={index} className="text-center border-t border-gray-300">
                    <td className="px-4 py-2">Cuota {detalle.cuota}</td>
                    <td className="px-4 py-2">{cuotasTabla.find(c => c.cuota === detalle.cuota)?.total}</td>
                    <td className="px-4 py-2">{detalle.abono}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="px-4 py-2 font-bold text-right">Total</td>
                  <td className="px-4 font-bold text-center">${parseFloat(montoAbono) || 0}</td>
                </tr>
                {cuotaConDiferencia.ultimaCuotaAlcanzada && (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-red-500 font-bold text-right">
                      Diferencia cuota {cuotaConDiferencia.ultimaCuotaAlcanzada}
                    </td>
                    <td className="px-4 text-red-500 font-bold text-center">
                      ${cuotaConDiferencia.diferencia.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        </section>
        <section className="mt-[20px] flex flex-col items-start w-full">
          <div className="flex w-full justify-between">
            <section>
              <span className="font-bold">Cuotas del préstamo</span>
            </section>
            <section className="grid grid-cols-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Verde m-1"></div>
                <span className="text-sm">Cuota Pagada</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Amarillo m-1"></div>
                <span className="text-sm">Cuota Abonada</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Gris border-2 border-Verde m-1"></div>
                <span className="text-sm">Cuota por Pagar</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Gris border-2 border-Amarillo m-1"></div>
                <span className="text-sm">Cuota por Abonar</span>
              </div>
            </section>
          </div>
          <div className="mt-[10px] flex gap-x-[40px] gap-y-[20px] flex-wrap max-h-[150px] overflow-y-auto py-[10px] scrollbar-thin ">
            {cuotasTabla.map((cuota, index) => (
              <TarjetaAbono
                key={index}
                cuota={cuota.cuota}
                valorCuota={cuota.total}
                color={determinarColor(cuota)}
                fontColor={determinarColor(cuota) === '#208768' ? '#fff' : '#000'}
                borderColor={ponerBordeTarjetaAbono(cuota.cuota)}
              />
            ))}
          </div>
        </section>
        <section className="mt-[20px] flex gap-[20px]">
          <BotonNormal texto="CANCELAR" width="358px" height="44px" color="#C82333" onClick={() => handleFramePagarCuota(false)} />
          <BotonNormal texto="PAGAR" width="358px" height="44px" color="#208768" onClick={handlePagarAbono} />
        </section>
      </div>
    </Overlay>
  );
}

export default FramePagarCuota;
