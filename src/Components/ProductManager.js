import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductManager = () => {
  const { products, isLoading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    type: '',
    sortConfig: {
      primary: 'orderId',
      secondary: 'variant',
      tertiary: 'sku'
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct.mutate({ id: selectedProduct._id, product: formData });
    } else {
      createProduct.mutate(formData);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      displayName: product.displayName,
      type: product.type,
      sortConfig: product.sortConfig
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      displayName: '',
      type: '',
      sortConfig: {
        primary: 'orderId',
        secondary: 'variant',
        tertiary: 'sku'
      }
    });
  };

  return (
    <div className="product-manager">
      <h2>{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label>Sort Config:</label>
          <select
            value={formData.sortConfig.primary}
            onChange={(e) => setFormData({
              ...formData,
              sortConfig: { ...formData.sortConfig, primary: e.target.value }
            })}
          >
            <option value="orderId">Order ID</option>
            <option value="variant">Variant</option>
            <option value="sku">SKU</option>
            <option value="width">Width</option>
            <option value="country">Country</option>
            <option value="nameId">Name ID</option>
          </select>
        </div>
        
        <button type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
        {selectedProduct && (
          <button type="button" onClick={resetForm}>Cancel</button>
        )}
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Display Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.displayName}</td>
              <td>{product.type}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager; 