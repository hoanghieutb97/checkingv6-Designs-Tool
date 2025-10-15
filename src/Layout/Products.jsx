import React, { useEffect, useRef } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Menu } from 'antd';
import { useStore, actions } from '../store';
import { PartitionOutlined } from '@ant-design/icons'

function Products(props) {
    const [state, dispatch] = useStore();
    const { activeProduct } = state;
    const menuRef = useRef(null);
    const { products = [], isLoading } = useProducts();

    function getItem(label, key, icon, children, type) { 
        return { key, icon, children, label, type }; 
    }

    useEffect(() => {
        if (activeProduct?.product) {
            const selectedElement = document.querySelector('.ant-menu-item-selected');
            if (selectedElement) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeProduct]);

    // Create menu items (single level)
    const items = products.map(product => 
        getItem(product.displayName, product.name, <PartitionOutlined />)
    );

    const clickMenu = ({ key }) => {
        console.log("key", key);
        
        dispatch(actions.dispatchProduct({ 
            list: 'All',
            product: key
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-menu">
            <Menu
                mode="inline"
                items={items}
                onClick={clickMenu}
                selectedKeys={activeProduct ? [activeProduct.product] : []}
                ref={menuRef}
                style={{
                    backgroundColor: '#001529',
                    color: 'white',
                    height: '99vh',
                    overflowY: 'auto'
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
                    color: rgba(255, 255, 255, 0.65);
                }
                .products-menu .ant-menu-item:hover {
                    color: white;
                }
                .products-menu .ant-menu-item-selected {
                    background-color: #1890ff !important;
                    color: white !important;
                }
                .products-menu .ant-menu-item-selected::after {
                    border-right-color: #1890ff;
                }
            `}</style>
        </div>
    );
}

export default Products;