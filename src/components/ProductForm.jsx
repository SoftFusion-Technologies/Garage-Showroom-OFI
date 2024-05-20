import React, { useState } from 'react';

const ProductForm = ({ addProduct, updateRates, rates }) => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (product && price) {
      addProduct({ name: product, price: parseFloat(price) });
      setProduct('');
      setPrice('');
    }
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    updateRates({ ...rates, [name]: parseFloat(value) });
  };

  return (
    <form onSubmit={handleAddProduct} className="mb-4 p-4 border rounded shadow-sm">
      <div className="mb-2">
        <label className="block text-sm font-medium">Producto:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Porcentaje Transferencia (%):</label>
        <input
          type="number"
          name="transferencia"
          value={rates.transferencia}
          onChange={handleRateChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Porcentaje 3 Cuotas (%):</label>
        <input
          type="number"
          name="tresCuotas"
          value={rates.tresCuotas}
          onChange={handleRateChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Porcentaje 6 Cuotas (%):</label>
        <input
          type="number"
          name="seisCuotas"
          value={rates.seisCuotas}
          onChange={handleRateChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-[#ff008a] text-white rounded">
        Agregar Producto
      </button>
    </form>
  );
};

export default ProductForm;
