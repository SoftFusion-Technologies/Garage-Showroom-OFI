import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import VentasPDF from './VentasPDF';

const ExportarPDF = ({ ventas, diasDeLaSemana }) => {
    const getFormattedDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };

    return (
        <div>
            <PDFDownloadLink
                document={<VentasPDF ventas={ventas} diasDeLaSemana={diasDeLaSemana} />}
                fileName={`ReporteDeVentas_${getFormattedDateTime()}.pdf`}
                className="mt-2 mb-5 px-4 py-2 bg-[#2ac135] text-white rounded"

            >
                {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default ExportarPDF;
