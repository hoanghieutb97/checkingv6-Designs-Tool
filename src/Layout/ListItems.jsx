import React from 'react';
import { useStore, actions } from '../store';
import dupItems from '../CalcFunctions/dupItems';
import copy from 'copy-to-clipboard';
import sortSheet from '../CalcFunctions/sortSheet';
function ListItems(props) {
    const [state, dispatch] = useStore();
    let { sheet, activeProduct } = state;
    sheet = sortSheet(sheet, activeProduct.product)

    return (
        <div>
            <div className="container-fluid">
                <div className="row">

                    {dupItems(sheet).map(item => <div className="col-15" key={item.stt}>
                        <div className="ctn-itemlist">
                            <div className="nameid1 cpt" onClick={() => copy(item.orderId)}>{item.orderId}</div>
                            <div className="sku1 cpt" onClick={() => copy(item.sku)}>{item.sku}</div>
                            <div className="product1 cpt" onClick={() => copy(item.product)}> {item.product}</div>
                            <div className="variant1 cpt" onClick={() => copy(item.variant)}>{item.variant}</div>
                            <div className="stt1 cpt" >{item.stt}</div>
                            {item.Quantity > 1 ? <div className="amount cpt">{item.Quantity}</div> : ""}
                            <div className="country1 cpt" >{item.country}</div>
                        </div>
                    </div>)}

                </div>
            </div>


        </div>
    );
}

export default ListItems; 
