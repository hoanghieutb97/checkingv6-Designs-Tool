import React, { useEffect, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { Menu } from 'antd';
import { useStore, actions } from '../store';
import { PartitionOutlined } from '@ant-design/icons'

function Products(props) {
    const [state, dispatch] = useStore();
    const { activeProduct } = state
    const menuRef = useRef(null);

    function getItem(label, key, icon, children, type) { 
        return { key, icon, children, label, type }; 
    }

    const items = PRODUCTS.map(item => 
        getItem(item[0], item[0], <PartitionOutlined />, 
            item[1].map(itemx => getItem(itemx[1], itemx[0]))
        )
    )

    const clickMenu = ({ keyPath }) => {
        if (keyPath && keyPath.length >= 2) {
            dispatch(actions.dispatchProduct({ 
                list: keyPath[1], 
                product: keyPath[0] 
            }))
        }
    }

    const rootSubmenuKeys = PRODUCTS.map(item => item[0]);
    
    const onOpenChange = (keys) => {
        if (!activeProduct) return;
        
        const latestOpenKey = keys.find((key) => [activeProduct.list].indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            dispatch(actions.dispatchProduct({ ...activeProduct, list: keys }))
        } else {
            dispatch(actions.dispatchProduct({ ...activeProduct, list: latestOpenKey ? latestOpenKey : "" }))
        }
    };

    // Scroll to selected item when activeProduct changes
    useEffect(() => {
        if (activeProduct && menuRef.current) {
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
                const selectedElement = menuRef.current.querySelector('.ant-menu-item-selected');
                if (selectedElement) {
                    const containerRect = menuRef.current.getBoundingClientRect();
                    const elementRect = selectedElement.getBoundingClientRect();
                    
                    // Always scroll on first selection, then check visibility for subsequent selections
                    if (!activeProduct._hasScrolled || elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
                        menuRef.current.scrollTo({
                            top: selectedElement.offsetTop - menuRef.current.offsetHeight / 2 + selectedElement.offsetHeight / 2,
                            behavior: 'smooth'
                        });
                        // Mark that we've scrolled for this selection
                        dispatch(actions.dispatchProduct({ ...activeProduct, _hasScrolled: true }));
                    }
                }
            }, 100);
        }
    }, [activeProduct]);

    // Nếu chưa có activeProduct, không render menu
    if (!activeProduct) {
        return null;
    }

    return (
        <div className='ctn-pro' ref={menuRef}>
            <Menu
                selectedKeys={[activeProduct.product]}
                openKeys={[activeProduct.list]}
                onOpenChange={onOpenChange}
                mode="inline"
                theme="dark"
                onClick={(item) => clickMenu(item)}
                items={items}
            />
        </div>
    );
}

export default Products;