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
      <h2 className="text-xl font-bold mb-2">Resumen Total</h2>
      <p>Total en Efectivo: ${total('efectivo').toFixed(2)}</p>
      <p>Total en Transferencia: ${total('transferencia').toFixed(2)}</p>
      <p>Total en 3 Cuotas: ${tresCuotasTotal.toFixed(2)}</p>
      <p>3 Cuotas de: ${calculateInstallment(tresCuotasTotal, 3)}</p>
      <p>Total en 6 Cuotas: ${seisCuotasTotal.toFixed(2)}</p>
      <p>6 Cuotas de: ${calculateInstallment(seisCuotasTotal, 6)}</p>
    </div>
  );
};

export default TotalSummary;
