import React from 'react';
import { useStore, actions } from '../store';
import _ from "lodash";
import dupItems from "../CalcFunctions/dupItems";
function ThongKe(props) {
    const [state, dispatch] = useStore();
    let { sheet, activeProduct } = state;

    sheet = dupItems(sheet);


    let arrNameId = _.uniq(sheet.map(item => item.nameId));
    arrNameId = arrNameId.map(item => sheet.filter(itemF => itemF.nameId === item))

    let noneSheet = sheet.filter(item => item.nameId === undefined)
    return (
        <div>
            <div className="title-thongke">
                <span className="tt-tk">• Tổng sản phẩm: {sheet.length}</span>
            </div>
            <div className="title-thongke do">
                {noneSheet.length !== 0 ? <span className="tt-tk">• CHƯA KHAI BÁO SHEET: {noneSheet.length}</span> : ""}
            </div>
            <div className="title-thongke">
                <p className='tsp'>• Tên sản phẩm</p>
                {arrNameId.map((item, key) => <div key={key} className="ml-5 fgf">
                    <span>
                        {item[0].nameId}{"  "}:{"  "}
                    </span>
                    <span>
                        {item.length}
                    </span>
                </div>)}
                <span>{ }</span>
            </div>
        </div>
    );
}

export default ThongKe;