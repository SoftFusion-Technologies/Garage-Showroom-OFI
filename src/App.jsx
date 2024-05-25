import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import TotalSummary from './components/TotalSummary';
import { garage, softfusion } from './images';

const App = () => {
  const [products, setProducts] = useState([]);
  const [rates, setRates] = useState({
    transferencia: 0,
    tresCuotas: 0,
    seisCuotas: 0,
  });

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateRates = (newRates) => {
    setRates(newRates);
  };
  // Nueva funcion agregada por Benjamin Orellana, para cancelar la compra
  const cancelPurchase = () => {
    setProducts([]);
  }; 
  
  const finalizarVenta = () => {
    const confirmacion = window.confirm('¿Seguro que desea finalizar la venta?');

    if (!confirmacion) {
      return;
    }

    if (products.length === 0) {
      alert('No hay productos en la venta');
      return;
    }

    const fecha = new Date().toLocaleDateString();
    const venta = { fecha, productos: products };

    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(ventas));

    setProducts([]);
  };


  return (
    <>
      <nav className='flex justify-center'>
        <div className=''>
          <img
            src={garage}
            alt="Logo El Garage"
            width={200}
            className='' />
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Calculadora de Precios</h1>
        <ProductForm
          addProduct={addProduct}
          updateRates={updateRates}
          rates={rates}
          cancelPurchase={cancelPurchase}
          finalizarVenta={finalizarVenta}
        />
        <ProductTable products={products} rates={rates} removeProduct={removeProduct} />
        <TotalSummary products={products} rates={rates} />
      </div>
      <footer className='flex flex-col justify-center items-center mt-10'>
        <div className='mx-auto'>
          <img
            src={softfusion}
            alt="Logo SoftFusion"
            width={100}
            className='mx-auto' />
          <h1 className='pb-2 text-[#999] '>Developed by SoftFusion</h1>
        </div>
        <h2 className=''>Copyright © 2024 - <span><a href="https://www.garagetienda.com.ar/" target='_blank'>El Garage.</a></span></h2>
        <p className='pb-2'>Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default App;
