import { useMemo, useState, useCallback } from "react";
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
    let abonoRestante = parseFloat(montoAbono) || 0;
    let ultimaCuotaAlcanzada = '';
    let diferencia = 0;

    for (let i = 0; i < cuotasTabla.length; i++) {
      const cuota = cuotasTabla[i];
      if (abonoRestante >= cuota.total) {
        abonoRestante -= cuota.total;
      } else {
        ultimaCuotaAlcanzada = i + 1;
        diferencia = cuota.total - abonoRestante;
        abonoRestante = 0;
        break;
      }
    }
    return { ultimaCuotaAlcanzada, diferencia };
  }, [montoAbono, cuotasTabla]);

  const handlePagarAbono = useCallback(async () => {
    const dataAbono = {
      idCredito: credito.idCredito,
      cantidadAbono: parseFloat(montoAbono),
      fechaAbono: new Date().toISOString(),
      descripcion: "pruebas",
    };
    try {
      const data = await postPagarAbono(dataAbono);
      handleFramePagarCuota(false);
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al pagar abono', error);
    }
  })

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

  return (
    <Overlay>
      <div className="bg-Fondo z-50 py-[20px] px-[30px] rounded-[10px] shadow-3xl flex flex-col items-center justify-center max-w-[70%]">
        <span className='text-AzulSlide font-bold text-3xl'>Préstamo {cliente.nombres} {cliente.apellidos}</span>
        <span className='font-bold text-xl'>Cédula de identidad No. {cliente.cedula}</span>
        <section className="flex w-full items-center justify-between mt-[20px]">
          <div className="flex flex-col gap-[10px] ">
            <InputEtiqueta
              etiqueta="Valor a abonar"
              type="number"
              placeholder="ej. $100.00"
              width={300}
              value={montoAbono}
              onChange={(e) => setMontoAbono(e.target.value)}
            />
            <BotonNormal texto="CALCULAR ABONO" width="300px" height="40px" color="#208768" hover="#166653" onClick={handleCalcularCuota} />
            <BotonNormal texto="PAGAR PRÉSTAMO" width="auto" height="40px" color="#5C96EB" hover="#166653" />
          </div>
          <IconFlechaDerecha width="40px" height="40px" color="#208768" />
          <div className="bg-white rounded-lg shadow-md p-5 border border-Gris max-h-[200px] overflow-y-auto scrollbar-thin">
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
                    <td className="px-4 py-2">{cuotasTabla[detalle.cuota - 1]?.total}</td>
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
            <section className="gap grid-cols-2 items-end gap-x-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Verde mr-1"></div>
                <span className="text-sm">Cuota Pagada</span>
                <div className="w-2 h-2 bg-Amarillo mr-1"></div>
                <span className="text-sm">Cuota Abonada</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-Gris border-2 border-Verde mr-1"></div>
                <span className="text-sm">Cuota por Pagar</span>
                <div className="w-2 h-2 bg-Gris border-2 border-Amarillo mr-1"></div>
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
                color="#d9d9d9"
                fontColor="black"
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
