import React from 'react';
import BotonNormal from './Atomos/BotonNormal';

function TablaAmortizacion({ prestamo }) {
  const {
    cliente,
    capital,
    interesMensual,
    tiempoMeses,
    cuotas,
    cuotaMensual
  } = prestamo;

  return (
    <div className="p-6 rounded-[20px] shadow-3xl flex flex-col items-center bg-Fondo z-50 pb-[100px]">
      <div className="w-full flex justify-between items-center">
        <button className="text-left">⬅ REGRESAR</button>
        <h1 className="text-xl font-bold">Crédito Creado</h1>
      </div>
      
      <div className="mt-4 p-4 w-full bg-white rounded-md shadow-lg">
        <h2 className="text-xl font-bold">Préstamo {cliente.nombre}</h2>
        <p>Cédula identidad No. {cliente.cedula}</p>
        <div className="flex justify-between mt-4">
          <p>Capital: USD {capital}</p>
          <p>Tiempo: {tiempoMeses} Meses</p>
          <p>Interés: {interesMensual}% Mensual</p>
          <p>Cuota Mensual: ${cuotaMensual}</p>
        </div>
      </div>

      <button className="bg-green-500 text-white mt-4 px-6 py-2 rounded">IMPRIMIR TABLA</button>

      <table className="w-full mt-6 table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Cuota</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Capital</th>
            <th className="border border-gray-300 px-4 py-2">Interés</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Abono</th>
            <th className="border border-gray-300 px-4 py-2">Intereses</th>
            <th className="border border-gray-300 px-4 py-2">Capital</th>
            <th className="border border-gray-300 px-4 py-2">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((cuota, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{cuota.numero}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.fecha}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.monto}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.capital}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.interes}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.total}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.abono}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.intereses}</td> 
              <td className="border border-gray-300 px-4 py-2">{cuota.capitalRestante}</td>
              <td className="border border-gray-300 px-4 py-2">{cuota.diferencia}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-around mt-6">
        <BotonNormal texto="ACEPTAR CRÉDITO" color="green" />
        <BotonNormal texto="NEGAR CRÉDITO" color="red" />
      </div>
    </div>
  );
}

export default TablaAmortizacion
