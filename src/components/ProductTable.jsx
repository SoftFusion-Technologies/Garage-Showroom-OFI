import React from 'react';

const ProductTable = ({ products, rates, removeProduct }) => {
  const calculatePrice = (price, rate) => price + (price * rate / 100);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efectivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transferencia</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3 Cuotas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">6 Cuotas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index} className="flex flex-col md:table-row md:flex-row">
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">Producto: </span>{product.name}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">Precio: </span>
                ${product.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">Efectivo: </span>
                ${product.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">Transferencia: </span>
                ${calculatePrice(product.price, rates.transferencia).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">3 Cuotas: </span>
                ${calculatePrice(product.price, rates.tresCuotas).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <span className="font-semibold md:hidden">6 Cuotas: </span>
                ${calculatePrice(product.price, rates.seisCuotas).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-2 whitespace-nowrap md:table-cell">
                <button
                  onClick={() => removeProduct(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
