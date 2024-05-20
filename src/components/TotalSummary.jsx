import React from 'react';

const TotalSummary = ({ products, rates }) => {
  const calculatePrice = (price, rate) => price + (price * rate / 100);

  const total = (type) => {
    return products.reduce((acc, product) => {
      const price = product.price;
      switch (type) {
        case 'efectivo':
          return acc + price;
        case 'transferencia':
          return acc + calculatePrice(price, rates.transferencia);
        case 'tresCuotas':
          return acc + calculatePrice(price, rates.tresCuotas);
        case 'seisCuotas':
          return acc + calculatePrice(price, rates.seisCuotas);
        default:
          return acc;
      }
    }, 0);
  };

  const calculateInstallment = (totalAmount, months) => {
    const installmentAmount = totalAmount / months;
    return installmentAmount.toFixed(2);
  };

  const tresCuotasTotal = total('tresCuotas');
  const seisCuotasTotal = total('seisCuotas');

  return (
    <div className="mt-4 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Resumen Total</h2>
      <p className="mb-3">
        Total en Efectivo:
        ${total('efectivo').toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="mb-3">
        Total en Transferencia:
        ${total('transferencia').toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="mb-3">
        Total en 3 Cuotas:
        ${tresCuotasTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="font-bold mb-3">
        3 Cuotas de:
        ${calculateInstallment(tresCuotasTotal, 3).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="mb-3">
        Total en 6 Cuotas:
        ${seisCuotasTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="font-bold mb-3">
        6 Cuotas de:
        ${calculateInstallment(seisCuotasTotal, 6).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>


    </div>
  );
};

export default TotalSummary;
