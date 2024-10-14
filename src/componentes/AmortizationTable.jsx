import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "./NavBar";
import BotonNormal from './Atomos/BotonNormal';
import IconFechaAtras from '../assets/IconFlechaAtras';
import BotonIcono from './Atomos/BotonIcono';
import { PATH_CREDITOS } from '../routes/paths';
import { patchAprobarCredito, patchRechazarCredito, getTablaAmortizacion } from '../hooks/creditos';
import { useReactToPrint } from 'react-to-print';
import FrameElegirCliente from './FrameElegirCliente';
import FramePagarCuota from './FramePagarCuota';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

function TablaAmortizacion() {

  const [abrirFrameElegirCliente, setAbrirFrameElegirCliente] = useState(false)
  const [abrirFramePagarCuota, setAbrirFramePagarCuota] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [cuotas, setCuotas] = useState([])
  const [mostrarAbonos, setMostrarAbonos] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();
  const toast = useRef(null);

  const {
    creditoCreado: credito = {},
    clienteCreado: cliente = {},
  } = location.state || {};

  useEffect(() => {
    if (credito.idCredito) {
      fetchTablaAmortizacion();
    }
  }, [credito.idCredito]);

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
  const handleFramePagarCuota = (abrir) => {
    setAbrirFramePagarCuota(abrir)
    if (!abrir) {
      fetchTablaAmortizacion();
    }
  }

  const fetchTablaAmortizacion = async () => {
    try {
      const tablaAmortizacion = await getTablaAmortizacion(credito.idCredito);
      setCuotas(tablaAmortizacion);
    } catch (error) {
      console.error('Error al obtener la tabla de amortización', error);
    }
  }

  const handleAceptarCredito = () => {
    confirmDialog({
      message: '¿Está seguro de que desea aceptar el crédito?',
      header: 'Confirmar aceptación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          const result = await patchAprobarCredito(credito.idCredito);
          if (result) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Crédito aceptado', life: 3000 });
            navigate(PATH_CREDITOS);
          } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al aceptar el crédito', life: 3000 });
          }
        } catch (error) {
          console.error('Error al aceptar el crédito', error);
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al aceptar el crédito', life: 3000 });
        }
      },
      reject: () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Aceptación del crédito cancelada', life: 3000 });
      },
    });
  };

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Tabla de amortización - ${cliente.nombres} ${cliente.apellidos}`,
  });

  if (!cuotas.length) {
    return <div>Cargando datos...</div>;
  }

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
      <Toast ref={toast} />
      <ConfirmDialog />
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
        <div className='overflow-x-auto w-full scrollbar-thin'>
          <table className="w-full table-auto border-separate border-spacing-0 rounded-lg border border-gray-300 bg-white">
            <thead>
              <tr className="text-center bg-gray-200">
                <th className="px-6 py-4 rounded-tl-lg min-w-[100px] sticky left-0 bg-gray-200">Cuota</th>
                <th className="px-6 py-4 min-w-[120px]">Fecha</th>
                <th className="px-6 py-4 min-w-[120px]">Monto</th>
                <th className="px-6 py-4 min-w-[120px]">Capital</th>
                <th className="px-6 py-4 min-w-[120px]">Interés</th>
                <th className={`px-6 py-4 ${credito.idEstado === 2 ? '' : 'rounded-tr-lg'}`}>Total</th>
                {credito.idEstado === 2 && (
                  <>
                    <th className="px-6 py-4 min-w-[120px]">Abono</th>
                    <th className="px-6 py-4 min-w-[120px]">Interes</th>
                    <th className="px-6 py-4 min-w-[120px]">Capital</th>
                    <th className="px-6 py-4 min-w-[120px] rounded-tr-lg">Diferencia</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {cuotas.map((cuota, index) => (
                <tr
                  key={index}
                  className="text-center border-t border-gray-300"
                  style={{ backgroundColor: pintarFilaCuota(cuota), color: pintarFilaCuota(cuota) === '#208768' ? '#ffffff' : '#000000' }}
                >
                  <td className="px-6 py-3 min-w-[120px] sticky left-0" style={{ backgroundColor: pintarFilaCuota(cuota), color: pintarFilaCuota(cuota) === '#208768' ? '#ffffff' : '#000000' }}>{cuota.cuota} Cuota</td>
                  <td className="px-6 py-3 min-w-[120px]">{new Date(cuota.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-3 min-w-[120px]">{cuota.monto.toFixed(2)}</td>
                  <td className="px-6 py-3 min-w-[120px]">{cuota.capital.toFixed(2)}</td>
                  <td className="px-6 py-3 min-w-[120px]">{cuota.interes.toFixed(2)}</td>
                  <td className="px-6 py-3 min-w-[120px]">{cuota.total.toFixed(2)}</td>
                  {credito.idEstado === 2 && (
                    <>
                      <td className="px-6 py-3 min-w-[120px]">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].abono.toFixed(2) : ''}</td>
                      <td className="px-6 py-3 min-w-[120px]">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].interes.toFixed(2) : ''}</td>
                      <td className="px-6 py-3 min-w-[120px]">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].capital.toFixed(2) : ''}</td>
                      <td className="px-6 py-3 min-w-[120px]">{cuota.detallesAbonos.length > 0 ? cuota.detallesAbonos[cuota.detallesAbonos.length - 1].diferencia.toFixed(2) : ''}</td>
                    </>
                  )}
                </tr>
              ))}
              <tr className="bg-[#007BFF] text-white font-bold text-center">
                <td className="px-6 py-3 text-left rounded-bl-lg min-w-[100px] sticky left-0 bg-[#007BFF]" colSpan="3">TOTAL</td>
                <td className="px-6 py-3 min-w-[120px]">{totalCapital}</td>
                <td className="px-6 py-3 min-w-[120px]">{totalInteres}</td>
                <td className={`px-6 py-3 min-w-[120px] ${credito.idEstado === 2 ? '' : 'rounded-br-lg'}`}>{totalMonto}</td>
                {credito.idEstado === 2 && (
                  <>
                    <td className="px-6 py-3 min-w-[120px]">{totalAbono}</td>
                    <td className="px-6 py-3 min-w-[120px]">{totalInteresAbonado}</td>
                    <td className="px-6 py-3 min-w-[120px]">{totalCapitalAbonado}</td>
                    <td className="px-6 py-3 min-w-[120px] rounded-br-lg">{totalDiferencia}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
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
            fetchTablaAmortizacion();
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
