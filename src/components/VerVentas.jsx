import React, { useEffect, useState, useRef } from 'react'
import VentasChart from './VentasChart'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../images/softfusion-logo.png'; // Ajusta la ruta de tu logo aquí

const VerVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
        setVentas(ventasGuardadas);
        setFilteredVentas(ventasGuardadas);
    }, []);

    const handleDateFilterChange = () => {
        const fromDate = new Date(fechaDesde);
        const toDate = new Date(fechaHasta);

        const ventasFiltradas = ventas.filter((venta) => {
            const ventaFecha = new Date(venta.fecha.split('/').reverse().join('-'));
            return (
                (!fechaDesde || ventaFecha >= fromDate) &&
                (!fechaHasta || ventaFecha <= toDate)
            );
        });

        setFilteredVentas(ventasFiltradas);
    };

    useEffect(() => {
        handleDateFilterChange();
    }, [fechaDesde, fechaHasta]);

    const getVentasPorDia = (dia) => {
        return filteredVentas.filter(venta => {
            const fecha = new Date(venta.fecha.split('/').reverse().join('-')); // Ajustar el formato de fecha
            return fecha.toLocaleDateString('es-ES', { weekday: 'long' }) === dia;
        });
    };

    const handleImprimirPDF = () => {
        const input = contentRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 180; // Ancho de la imagen
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 15, 10, imgWidth, imgHeight); // Posición de la imagen y tamaño
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString().replaceAll('/', '_');
            pdf.save(`ReporteDeVentas_${formattedDate}.pdf`);
        });
    };

    const diasDeLaSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Fecha Desde:</label>
                <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Fecha Hasta:</label>
                <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded"
                />
            </div>

            <div ref={contentRef} style={{ fontFamily: 'Arial, sans-serif' }}>
                {diasDeLaSemana.map(dia => (
                    <div key={dia} className="mb-6">
                        <h2 className="text-xl font-bold mb-2">{dia.charAt(0).toUpperCase() + dia.slice(1)}</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-md rounded-lg">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Productos</th>
                                        <th className="px-4 py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {getVentasPorDia(dia).map((venta, index) => {
                                        const totalVenta = venta.productos.reduce((total, product) => total + product.price, 0);
                                        return (
                                            <tr key={index} className="text-gray-700">
                                                <td className="px-4 py-3 border">{venta.fecha}</td>
                                                <td className="px-4 py-3 border">
                                                    {venta.productos.map((product, i) => (
                                                        <div key={i}>Producto: {product.name} || Precio: ${product.price.toFixed(2)}</div>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-3 border">Total: ${totalVenta.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
                <VentasChart ventas={filteredVentas} />
            </div>
            <button
                onClick={handleImprimirPDF}
                className="ml-5 mt-2 mb-5 px-4 py-2 bg-[#2ac135] text-white rounded"

            >Imprimir PDF</button>
        </div>
    );
};

export default VerVentas;
