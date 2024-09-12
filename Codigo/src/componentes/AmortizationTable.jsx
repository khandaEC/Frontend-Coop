import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "../componentes/NavBar";
import BotonNavbar from "../componentes/Atomos/BotonNavbar";
import BotonNormal from './Atomos/BotonNormal';
import IconFechaAtras from '../assets/IconFlechaAtras';
import BotonIcono from './Atomos/BotonIcono';

function TablaAmortizacion() {
    const { idCredito } = useParams();
    const [cuotas, setCuotas] = useState([]);
    const [prestamo, setPrestamo] = useState(null);

    useEffect(() => {
        const fetchTablaAmortizacion = async () => {
            try {
                if (idCredito) {
                    const response = await fetch(`https://backend-coop.onrender.com/creditos/tablaAmortizacion?idCredito=${idCredito}`);
                    const data = await response.json();
                    setCuotas(data); // Guardamos las cuotas directamente
                } else {
                    console.error('idCredito está indefinido');
                }
            } catch (error) {
                console.error('Error al obtener los datos de amortización:', error);
            }
        };

        fetchTablaAmortizacion();
    }, [idCredito]);

    if (cuotas.length === 0) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div className="flex flex-col items-center w-screen px-[68px] py-[30px]">
            <NavBar>
                <BotonIcono width={'10px'} iconoIzquierda={<IconFechaAtras color={'#5A6268'} width={'15px'} height={'15px'} />} onClick={() => window.location.href = '/creditos'} />
                <BotonNavbar text="REGRESAR" onClick={() => window.location.href = '/creditos'} />               
            </NavBar>
            <div className="w-full p-6 rounded-[20px] flex flex-col items-center bg-Fondo z-50 pb-[100px]">
                <div className="w-full flex justify-between items-center mb-4">
                    <button className="bg-[#208768] text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-[#218838]">
                        IMPRIMIR TABLA
                    </button>
                </div>

                <table className="w-full mt-6 table-auto border-separate border-spacing-0 rounded-lg border border-gray-300 bg-white">
                    <thead>
                        <tr className="text-center bg-gray-200">
                            <th className="px-6 py-4 rounded-tl-lg">Cuota</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Capital</th>
                            <th className="px-6 py-4">Interés</th>
                            <th className="px-6 py-4 rounded-tr-lg">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuotas.map((cuota, index) => (
                            <tr key={index} className="text-center border-t border-gray-300">
                                <td className="px-6 py-3">{cuota.cuota} Cuota</td>
                                <td className="px-6 py-3">{new Date(cuota.fecha).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{cuota.monto.toFixed(2)}</td>
                                <td className="px-6 py-3">{cuota.capital.toFixed(2)}</td>
                                <td className="px-6 py-3">{cuota.interes.toFixed(2)}</td>
                                <td className="px-6 py-3">{cuota.total.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="bg-[#007BFF] text-white font-bold text-center">
                            <td className="px-6 py-3 text-left rounded-bl-lg" colSpan="2">TOTAL</td>
                            <td className="px-6 py-3">{cuotas.reduce((sum, cuota) => sum + cuota.monto, 0).toFixed(2)}</td>
                            <td className="px-6 py-3">{cuotas.reduce((sum, cuota) => sum + cuota.capital, 0).toFixed(2)}</td>
                            <td className="px-6 py-3">{cuotas.reduce((sum, cuota) => sum + cuota.interes, 0).toFixed(2)}</td>
                            <td className="px-6 py-3 rounded-br-lg">{cuotas.reduce((sum, cuota) => sum + cuota.total, 0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-full flex justify-between mt-6">
                    <BotonNormal 
                        texto="ACEPTAR CRÉDITO" 
                        onClick={() => alert('Crédito aceptado')} 
                        width="auto" 
                        height="40px" 
                        color="#208768" 
                        hover="#218838" 
                        className="text-sm whitespace-nowrap px-4 py-2"
                    />
                    <BotonNormal 
                        texto="NEGAR CRÉDITO" 
                        onClick={() => alert('Crédito negado')} 
                        width="auto" 
                        height="40px" 
                        color="#DC3545" 
                        hover="#C82333" 
                        className="text-sm whitespace-nowrap px-4 py-2 hover:bg-green-600"
                    />
                </div>
            </div>
        </div>
    );
}

export default TablaAmortizacion;
