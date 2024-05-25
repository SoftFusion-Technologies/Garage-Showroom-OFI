import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const VentasChart = ({ ventas }) => {
    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const getVentasPorDia = (dia) => {
        return ventas.filter(venta => {
            const fecha = new Date(venta.fecha.split('/').reverse().join('-'));
            return fecha.toLocaleDateString('es-ES', { weekday: 'long' }) === dia.toLowerCase();
        });
    };

    const dataBar = {
        labels: diasDeLaSemana,
        datasets: [
            {
                label: 'Ventas por Día $',
                data: diasDeLaSemana.map(dia => getVentasPorDia(dia).reduce((total, venta) => total + venta.productos.reduce((sum, producto) => sum + producto.price, 0), 0)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const dataPie1 = {
        labels: diasDeLaSemana,
        datasets: [
            {
                label: 'Ventas por Día $',
                data: diasDeLaSemana.map(dia => getVentasPorDia(dia).reduce((total, venta) => total + venta.productos.reduce((sum, producto) => sum + producto.price, 0), 0)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    // const dataPie2 = {
    //     labels: ['Efectivo', 'Transferencia', '3 Cuotas', '6 Cuotas'],
    //     datasets: [
    //         {
    //             label: 'Ventas por Método de Pago',
    //             data: [
    //                 ventas.filter(venta => venta.metodoPago === 'Efectivo').reduce((total, venta) => total + venta.total, 0),
    //                 ventas.filter(venta => venta.metodoPago === 'Transferencia').reduce((total, venta) => total + venta.total, 0),
    //                 ventas.filter(venta => venta.metodoPago === '3 Cuotas').reduce((total, venta) => total + venta.total, 0),
    //                 ventas.filter(venta => venta.metodoPago === '6 Cuotas').reduce((total, venta) => total + venta.total, 0),
    //             ],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.6)',
    //                 'rgba(54, 162, 235, 0.6)',
    //                 'rgba(255, 205, 86, 0.6)',
    //                 'rgba(75, 192, 192, 0.6)',
    //             ],
    //         },
    //     ],
    // };

    const dataLine = {
        labels: diasDeLaSemana,
        datasets: [
            {
                label: 'Ventas por Día',
                data: diasDeLaSemana.map(dia => getVentasPorDia(dia).reduce((total, venta) => total + venta.productos.reduce((sum, producto) => sum + producto.price, 0), 0)),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.6)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Ventas por Días (Gráfico de Barras)</h2>
                <Bar data={dataBar} />
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Ventas por Día (Gráfico Circular)</h2>
                <Pie data={dataPie1} />
            </div>
                

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Ventas por Día (Gráfico Lineal)</h2>
                <Line data={dataLine} />
            </div>
            {/* <h2 className="text-xl font-bold mb-4">Ventas por Método de Pago</h2> */}
            {/* <div className="flex justify-between">
                 <div className="w-1/2 mr-2">
                    <Pie data={dataPie2} />
                </div> 
            </div> */}
        </div>
    );
};

export default VentasChart;
