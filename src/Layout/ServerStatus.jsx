import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

function ServerStatus() {
    const { products = [], isLoading: loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        displayName: '',
        type: '',
        sortConfig: {
            primary: 'orderId',
            secondary: 'variant',
            tertiary: 'sku'
        },
        typeProduct: 'spkhac'
    });
    console.log("formData..........................", formData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('sortConfig.')) {
            const configKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                sortConfig: {
                    ...prev.sortConfig,
                    [configKey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct.mutateAsync(formData);
            setFormData({
                name: '',
                displayName: '',
                type: '',
                sortConfig: {
                    primary: 'orderId',
                    secondary: 'variant',
                    tertiary: 'sku'
                },
                typeProduct: 'spkhac'
            });
            setShowForm(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            displayName: product.displayName,
            type: product.type,
            sortConfig: product.sortConfig,
            typeProduct: product.typeProduct
        });
        setShowEditForm(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProduct.mutateAsync({
                id: editingProduct._id,
                product: formData
            });
            setShowEditForm(false);
            setEditingProduct(null);
            setFormData({
                name: '',
                displayName: '',
                type: '',
                sortConfig: {
                    primary: 'orderId',
                    secondary: 'variant',
                    tertiary: 'sku'
                },
                typeProduct: 'spkhac'
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct.mutateAsync(productId);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    console.log(products);
    return (
        <div className="App">
            <h2>Danh sách sản phẩm từ MongoDB</h2>

            {showSuccess && (
                <div style={{
                    marginBottom: '20px',
                    padding: '15px',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    border: '1px solid #c3e6cb',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>✅ Sản phẩm đã được tạo thành công!</span>
                    <button
                        onClick={() => setShowSuccess(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer',
                            color: '#155724'
                        }}
                    >
                        ×
                    </button>
                </div>
            )}

            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: showForm ? '#ff6b6b' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                {showForm ? 'Hủy thêm mới' : 'Thêm sản phẩm mới'}
            </button>

            {showForm && (
                <div style={{
                    marginBottom: '20px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Thêm sản phẩm mới</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Tên sản phẩm: *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Tên hiển thị: *
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Số File: *
                            </label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '200px',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                Cấu hình sắp xếp:
                            </label>
                            <select
                                name="sortConfig"
                                value={`${formData.sortConfig.primary},${formData.sortConfig.secondary},${formData.sortConfig.tertiary}`}
                                onChange={(e) => {
                                    const [primary, secondary, tertiary] = e.target.value.split(',');
                                    setFormData(prev => ({
                                        ...prev,
                                        sortConfig: {
                                            primary: primary || 'orderId',
                                            secondary: secondary || 'variant',
                                            tertiary: tertiary || 'sku'
                                        }
                                    }));
                                }}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="orderId,variant,sku">orderId, variant, sku (Mặc định)</option>
                                <option value="country,orderId,sku">country, orderId, sku</option>
                                <option value="variant,orderId,sku">variant, orderId, sku</option>
                                <option value="width,orderId,sku">width, orderId, sku</option>
                                <option value="nameId,orderId,sku">nameId, orderId, sku</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                Loại sản phẩm:
                            </label>
                            <select
                                name="typeProduct"
                                value={formData.typeProduct}
                                onChange={(e) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        typeProduct: e.target.value || "spkhac"
                                    }));
                                }}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                            >

                                <option value="1lop">1 lớp</option>
                                <option value="ornament">ornament</option>
                                <option value="2lop">2 lớp</option>
                                <option value="nhieulop">nhiều lớp</option>
                                <option value="phoisan">phôi sẵn</option>
                                <option value="spkhac">Sản phẩm khác</option>

                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="submit"
                                disabled={createProduct.isPending}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                {createProduct.isPending ? 'Đang tạo...' : 'Tạo sản phẩm'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading && <p>Đang tải dữ liệu...</p>}

            {error && (
                <div style={{ color: 'red', margin: '10px 0' }}>
                    <p>Không thể kết nối đến server hoặc database</p>
                </div>
            )}

            {!loading && !error && (
                <div>
                    <p>Tổng số sản phẩm: {products.length}</p>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {products.length === 0 ? (
                            <p>Không có sản phẩm nào trong database</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '15%' }}>Tên code</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '15%' }}>Tên hiển thị</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '8%' }}>Số File</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '42%' }}>Cấu hình</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '42%' }}>loại SP</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', width: '20%' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Sắp xếp theo createdAt mới nhất trước */}
                                    {[...products].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)).map((product) => (
                                        <tr key={product._id}>
                                            <td style={{ border: '1px solid #ddd', padding: '12px', wordWrap: 'break-word' }}>
                                                {product.name || 'N/A'}
                                            </td>
                                            <td style={{ border: '1px solid #ddd', padding: '12px', wordWrap: 'break-word' }}>
                                                {product.displayName || 'N/A'}
                                            </td>
                                            <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                                                {product.type || 'N/A'}
                                            </td>
                                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                                                {product.sortConfig ? (
                                                    <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                                                        <div><strong>Primary:</strong> {product.sortConfig.primary}</div>
                                                        <div><strong>Secondary:</strong> {product.sortConfig.secondary}</div>
                                                        <div><strong>Tertiary:</strong> {product.sortConfig.tertiary}</div>
                                                    </div>
                                                ) : 'N/A'}
                                            </td>
                                            <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                                                {product.typeProduct || 'N/A'}
                                            </td>
                                            <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            backgroundColor: '#007bff',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            backgroundColor: '#dc3545',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* Modal Edit Form */}
            {showEditForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Sửa sản phẩm</h3>
                        <form onSubmit={handleUpdate}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        Tên sản phẩm: *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        Tên hiển thị: *
                                    </label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Số File: *
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '200px',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                    Cấu hình sắp xếp:
                                </label>
                                <select
                                    name="sortConfig"
                                    value={`${formData.sortConfig.primary},${formData.sortConfig.secondary},${formData.sortConfig.tertiary}`}
                                    onChange={(e) => {
                                        const [primary, secondary, tertiary] = e.target.value.split(',');
                                        setFormData(prev => ({
                                            ...prev,
                                            sortConfig: {
                                                primary: primary || 'orderId',
                                                secondary: secondary || 'variant',
                                                tertiary: tertiary || 'sku'
                                            }
                                        }));
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="orderId,variant,sku">orderId, variant, sku (Mặc định)</option>
                                    <option value="country,orderId,sku">country, orderId, sku</option>
                                    <option value="variant,orderId,sku">variant, orderId, sku</option>
                                    <option value="width,orderId,sku">width, orderId, sku</option>
                                    <option value="nameId,orderId,sku">nameId, orderId, sku</option>
                                </select>
                            </div>
                            {/* ///////////////////////// */}

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                    Loại sản phẩm:
                                </label>
                                <select
                                    name="sortConfig"
                                    value={formData.typeProduct}
                                    onChange={(e) => {
                                        const typeProduct = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            typeProduct: e.target.value || "spkhac"

                                        }));
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="ornament">ornament</option>
                                    <option value="1lop">1 lớp</option>
                                    <option value="2lop">2 lớp</option>
                                    <option value="nhieulop">nhiều lớp</option>
                                    <option value="phoisan">phôi sẵn</option>
                                    <option value="spkhac">Sản phẩm khác</option>

                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button
                                    type="submit"
                                    disabled={updateProduct.isPending}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    {updateProduct.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setEditingProduct(null);
                                    }}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServerStatus;
