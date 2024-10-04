import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import NavBar from "./NavBar";
import BotonNormal from './Atomos/BotonNormal';
import IconFechaAtras from '../assets/IconFlechaAtras';
import BotonIcono from './Atomos/BotonIcono';
import { PATH_CREDITOS } from '../routes/paths';
import { patchAprobarCredito, patchRechazarCredito } from '../hooks/creditos';
import { useReactToPrint } from 'react-to-print';
import FrameElegirCliente from './FrameElegirCliente';
import FramePagarCuota from './FramePagarCuota';

function TablaAmortizacion() {

  const [abrirFrameElegirCliente, setAbrirFrameElegirCliente] = useState(false)
  const [abrirFramePagarCuota, setAbrirFramePagarCuota] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const {
    tablaAmortizacion: cuotas = [],
    creditoCreado: credito = {},
    clienteCreado: cliente = {},
  } = location.state || {};

  const totalInteres = useMemo(
    () => cuotas.reduce((sum, cuota) => sum + cuota.interes, 0).toFixed(2),
    [cuotas]
  );

  const totalCapital = useMemo(
    () => cuotas.reduce((sum, cuota) => sum + cuota.capital, 0).toFixed(2),
    [cuotas]
  );

  const totalMonto = useMemo(
    () => cuotas.reduce((sum, cuota) => sum + cuota.total, 0).toFixed(2),
    [cuotas]
  );

  const totalAbono = useMemo(
    () => cuotas.reduce((sum, cuota) => {
      if (cuota && cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
        const lastDetail = cuota.detallesAbonos[cuota.detallesAbonos.length - 1];
        return sum + (lastDetail.abono || 0);
      }
      return sum;
    }, 0).toFixed(2),
    [cuotas]
  );

  const totalInteresAbonado = useMemo(
    () => cuotas.reduce((sum, cuota) => {
      if (cuota && cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
        const lastDetail = cuota.detallesAbonos[cuota.detallesAbonos.length - 1];
        return sum + (lastDetail.interes || 0);
      }
      return sum;
    }, 0).toFixed(2),
    [cuotas]
  );

  const totalCapitalAbonado = useMemo(
    () => cuotas.reduce((sum, cuota) => {
      if (cuota && cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
        const lastDetail = cuota.detallesAbonos[cuota.detallesAbonos.length - 1];
        return sum + (lastDetail.capital || 0);
      }
      return sum;
    }, 0).toFixed(2),
    [cuotas]
  );

  const totalDiferencia = useMemo(
    () => cuotas.reduce((sum, cuota) => {
      if (cuota && cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
        const lastDetail = cuota.detallesAbonos[cuota.detallesAbonos.length - 1];
        return sum + (lastDetail.diferencia || 0);
      }
      return sum;
    }, 0).toFixed(2),
    [cuotas]
  );

  const handleFrameElegirCliente = (abrir) => setAbrirFrameElegirCliente(abrir)
  const handleFramePagarCuota = (abrir) => setAbrirFramePagarCuota(abrir)

  const handleAceptarCredito = async () => {
    try {
      const result = await patchAprobarCredito(credito.idCredito)
      if (result) {
        navigate(PATH_CREDITOS)
      } else {
        alert('Error al aceptar el crédito')
      }
    } catch (error) {
      console.error('Error al aceptar el crédito', error)
    }
  }

  const handleNegarCredito = async () => {
    try {
      const result = await patchRechazarCredito(credito.idCredito)
      if (result) {
        navigate(PATH_CREDITOS)
      } else {
        alert('Error al negar el crédito')
      }
    } catch (error) {
      console.error('Error al negar el crédito', error)
    }
  }

  if (!cuotas.length) {
    return <div>Cargando datos...</div>;
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Tabla de amortización - ${cliente.nombres} ${cliente.apellidos}`,
  });

  const pintarFilaCuota = (cuota) => {
    if (cuota.detallesAbonos && cuota.detallesAbonos.length > 0) {
      const detalleAbono = cuota.detallesAbonos[cuota.detallesAbonos.length - 1];
      if (detalleAbono.diferencia > 0) {
        return '#FFD700';
      } else if (detalleAbono.diferencia === 0) {
        return '#208768';
      }
    }
    return '#FFFFFF';
  };

  return (
    <div className="flex flex-col items-center px-[68px] py-[30px]">
      <NavBar>
        <BotonIcono texto="REGRESAR" width={'140px'} onClick={() => navigate(PATH_CREDITOS)} iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />} />
      </NavBar>
      <div ref={componentRef} className="w-full mt-6 rounded-[20px] flex flex-col items-center bg-Fondo ">
        <div className='w-full bg-white border border-Gris rounded-[10px] flex flex-col items-center justify-center p-5 mb-3'>
          <span className='text-AzulSlide font-bold text-3xl'>Prestamo {cliente.nombres} {cliente.apellidos}</span>
          <span className='font-bold text-xl'>Cédula de identidad No. {cliente.cedula} </span>
          <span className='font-light text-sm'>{cliente.direccion} - {cliente.telefono}</span>
          <section className='w-[50%] flex justify-between mt-3'>
            <div className='flex flex-col'>
              <span>Capital: <span className='font-bold'>${credito.capitalCredito}</span></span>
              <span>Interés: <span className='font-bold'>{credito.interesCredito}% Mensual</span></span>
            </div>
            <div className='flex flex-col'>
              <span>Tiempo: <span className='font-bold'>{credito.tiempo} Meses</span></span>
              <span>Interés total: <span className='font-bold'>${totalInteres}</span></span>
            </div>
          </section>
        </div>
        <div className="w-full flex justify-between items-center mb-3 no-print">
          <BotonNormal texto="IMPRIMIR TABLA" onClick={handlePrint} width="auto" height="40px" color="#208768" hover="#166653" className="text-sm whitespace-nowrap px-4 py-2" />
          {credito.idEstado === 2 && (
            <BotonNormal texto="PAGAR CUOTA" width="auto" height="40px" color="#5C96EB" className="text-sm whitespace-nowrap px-4 py-2"
              onClick={() => {
                setAbrirFramePagarCuota(true)
              }}
            />
          )}
          {credito.idEstado === 1 && (
            <BotonNormal texto="EDITAR DATOS" width={'auto'} height={'40px'} color={'#E0A800'}
              onClick={() => {
                setEditMode(true)
                setAbrirFrameElegirCliente(true);
              }}
            />
          )}
        </div>
        <div className='w-full flex justify-end gap-2'>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-Verde m-1"></div>
            <span className="text-sm">Cuota Pagada</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-Amarillo m-1"></div>
            <span className="text-sm">Cuota Abonada</span>
          </div>
        </div>
        <table className="w-full table-auto border-separate border-spacing-0 rounded-lg border border-gray-300 bg-white">
          <thead>
            <tr className="text-center bg-gray-200">
              <th className="px-6 py-4 rounded-tl-lg">Cuota</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4">Capital</th>
              <th className="px-6 py-4">Interés</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Abono</th>
              <th className="px-6 py-4">Interes</th>
              <th className="px-6 py-4">Capital</th>
              <th className="px-6 py-4 rounded-tr-lg">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.map((cuota, index) => (
              <tr
                key={index}
                className="text-center border-t border-gray-300"
                style={{ backgroundColor: pintarFilaCuota(cuota), color: pintarFilaCuota(cuota) === '#208768' ? '#ffffff' : '#000000' }}
              >
                <td className="px-6 py-3">{cuota.cuota} Cuota</td>
                <td className="px-6 py-3">{new Date(cuota.fecha).toLocaleDateString()}</td>
                <td className="px-6 py-3">{cuota.monto.toFixed(2)}</td>
                <td className="px-6 py-3">{cuota.capital.toFixed(2)}</td>
                <td className="px-6 py-3">{cuota.interes.toFixed(2)}</td>
                <td className="px-6 py-3">{cuota.total.toFixed(2)}</td>
                <td className="px-6 py-3">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].abono.toFixed(2) : ''}</td>
                <td className="px-6 py-3">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].interes.toFixed(2) : ''}</td>
                <td className="px-6 py-3">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].capital.toFixed(2) : ''}</td>
                <td className="px-6 py-3">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].diferencia.toFixed(2) : ''}</td>
              </tr>
            ))}
            <tr className="bg-[#007BFF] text-white font-bold text-center">
              <td className="px-6 py-3 text-left rounded-bl-lg" colSpan="3">TOTAL</td>
              <td className="px-6 py-3">{totalCapital}</td>
              <td className="px-6 py-3">{totalInteres}</td>
              <td className="px-6 py-3">{totalMonto}</td>
              <td className="px-6 py-3">{totalAbono}</td>
              <td className="px-6 py-3">{totalInteresAbonado}</td>
              <td className="px-6 py-3">{totalCapitalAbonado}</td>
              <td className="px-6 py-3 rounded-br-lg">{totalDiferencia}</td>
            </tr>
          </tbody>
        </table>
        {credito.idEstado === 1 && (
          <>
            <div className="w-full flex justify-start mt-6 gap-2 no-print">
              <BotonNormal
                texto="ACEPTAR CRÉDITO"
                onClick={handleAceptarCredito}
                width="auto"
                height="40px"
                color="#208768"
                className="text-sm whitespace-nowrap px-4 py-2"
              />
              <BotonNormal
                texto="NEGAR CRÉDITO"
                onClick={handleNegarCredito}
                width="auto"
                height="40px"
                color="#DC3545"
                className="text-sm whitespace-nowrap px-4 py-2 hover:bg-green-600"
              />
            </div>
          </>
        )}
        {credito.idEstado === 1 && (
          <div className='mt-20 flex flex-col items-center border border-Gris p-6 rounded-lg bg-white w-[80%] print hidden'>
            <span className='font-bold text-2xl mb-4 underline'>Recibí conforme</span>

            <div className='w-full flex justify-between mb-4'>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Nombre:<span className='font-bold text-lg'> {cliente.nombres} {cliente.apellidos}</span>
                </span>
                <span className='font-semibold text-lg'>Cédula: <span className='font-bold text-lg'>{cliente.cedula}</span></span>
              </div>
            </div>
            <div className='w-full flex justify-between mb-4'>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Fecha: ____________________________</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Firma: ____________________________</span>
              </div>
            </div>

            <div className='w-full flex justify-end'>
              <span className='text-sm text-gray-500'>Nota: Firma y fecha son obligatorias</span>
            </div>
          </div>
        )}
      </div>
      {abrirFrameElegirCliente && (
        <FrameElegirCliente
          handleClickCerrarFrameElegirCliente={() => {
            handleFrameElegirCliente(false);
            setEditMode(false);
          }}
          editMode={editMode}
          credito={credito}
          cliente={cliente}
        />
      )}
      {abrirFramePagarCuota && (
        <FramePagarCuota
          cliente={cliente}
          credito={credito}
          cuotasTabla={cuotas}
          handleFramePagarCuota={handleFramePagarCuota}
        />
      )}
    </div>
  );
}

export default TablaAmortizacion;
