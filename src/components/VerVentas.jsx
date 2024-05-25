import React, { useEffect, useState } from 'react'
import VentasChart from './VentasChart'
import ProductForm from './ProductForm'

const VerVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

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

    const formatCurrency = (value) => {
        return value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

            {diasDeLaSemana.map(dia => (
                <div key={dia} className="mb-6">
                    <h2 className="text-xl font-bold">{dia.charAt(0).toUpperCase() + dia.slice(1)}</h2>
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
                                    // Calcular el total de la venta por día
                                    const totalVenta = venta.productos.reduce((total, product) => total + product.price, 0);

                                    return (
                                        <tr key={index} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                {venta.fecha}
                                            </td>
                                            <td className="px-4 py-3 border">
                                                {venta.productos.map((product, i) => (
                                                    <div key={i}>Producto: {product.name} ||  Precio:
                                                        ${formatCurrency(product.price)}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-3 border">
                                                Total: ${formatCurrency(totalVenta)}
                                            </td>
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
    );
};

export default VerVentas;
