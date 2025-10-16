import React, { useEffect, useRef, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Menu } from 'antd';
import { useStore, actions } from '../store';
import { PartitionOutlined } from '@ant-design/icons'

function Products(props) {
    const [state, dispatch] = useStore();
    const { activeProduct } = state;
    const menuRef = useRef(null);
    const { products = [], isLoading } = useProducts();
    const [openKeys, setOpenKeys] = useState([]);

    function getItem(label, key, icon, children, type) {
        return { key, icon, children, label, type };
    }

    useEffect(() => {
        if (activeProduct?.product) {
            const activeProductData = products.find(p => p.name === activeProduct.product);
            if (activeProductData) {
                setOpenKeys([activeProductData.typeProduct]);
            }

            const selectedElement = document.querySelector('.ant-menu-item-selected');
            if (selectedElement) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeProduct, products]);

    // Group products by typeProduct
    const groupedProducts = products.reduce((acc, product) => {
        const typeProduct = product.typeProduct || 'spkhac';
        if (!acc[typeProduct]) {
            acc[typeProduct] = [];
        }
        acc[typeProduct].push(product);
        return acc;
    }, {});

    // Create menu items with submenu structure (sorted by typeProduct)
    const items = Object.entries(groupedProducts)
        .sort(([a], [b]) => a.localeCompare(b)) // Sort typeProduct alphabetically
        .map(([typeProduct, products]) => {
            const children = products
                .sort((a, b) => a.displayName.localeCompare(b.displayName)) // Sort products alphabetically
                .map(product =>
                    getItem(product.displayName, product.name, <PartitionOutlined />)
                );

            // Capitalize first letter of typeProduct for display
            const displayTypeProduct = typeProduct.charAt(0).toUpperCase() + typeProduct.slice(1);

            return getItem(displayTypeProduct, typeProduct, <PartitionOutlined />, children);
        });

    const clickMenu = ({ key, keyPath }) => {
        console.log("key", key);
        console.log("keyPath", keyPath);
        // setOpenKeys([key])
        // Only dispatch if it's a product (not a typeProduct group)
        // If keyPath has 2 elements, the second one is the product name
        if (keyPath.length === 2) {
            const productName = keyPath[0];
            dispatch(actions.dispatchProduct({
                list: 'All',
                product: productName
            }));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log("products..........................", products);

    return (
        <div className="products-menu">
            <Menu
                mode="inline"
                items={items}
                onClick={clickMenu}
                selectedKeys={activeProduct ? [activeProduct.product] : []}
                openKeys={openKeys}
                onOpenChange={setOpenKeys}
                expandIcon={({ isOpen }) => isOpen ? '▼' : '***-***-***'}
                ref={menuRef}
                style={{
                    backgroundColor: '#000',
                    color: 'white',
                    height: '885px',
                    overflowY: 'auto',
                  
                }}
            />
            <style>{`
                .products-menu {
                    height: 87vh;
                    overflow: hidden;
                }
                .products-menu .ant-menu {
                    height: 100%;
                }
                .products-menu .ant-menu-item {
                    color: rgb(255, 255, 255);
                    background-color: #343a40 !important;
                    margin-bottom: 1px !important;
                    padding-left: 10px !important;
                }
                .products-menu .ant-menu-item:hover {
                    color: #fff !important;
                    background-color:#1890ff !important;
                }
                .products-menu .ant-menu-item-selected {
                    background-color: #1890ff !important;
                    color: white !important;
                 
                }
                .products-menu .ant-menu-item-selected::after {
                    border-right-color: #1890ff;
                }
                .products-menu .ant-menu-submenu {
                
                    background-color:rgb(0, 0, 0) !important;
                    margin-bottom: 2px !important;
                }
                .products-menu .ant-menu-submenu-title {
                    color: white !important;
                    background-color:rgb(0, 190, 181) !important;
                    font-weight: bold;
                     
                }
                .products-menu .ant-menu-submenu-title:hover {
                    background-color: #404040 !important;
                }
                .products-menu .ant-menu-sub {
                    background-color: #1a1a1a !important;
                }
            `}</style>
        </div>
    );
}

export default Products;