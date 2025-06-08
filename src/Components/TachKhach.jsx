import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useStore, actions } from '../store';
import _ from "lodash";
import * as XLSX from 'xlsx';
import dupItems from '../CalcFunctions/dupItems';
function TachVariant(props) {
    const [state, dispatch] = useStore();
    let { sheet, activeProduct } = state;
    const [ActiveButton, setActiveButton] = useState([]);
    let listVariant = _.uniq(sheet.map(item => item.partner)).map(item => sheet.filter(itemFilter => itemFilter.partner === item))
    let handChangeButton = (item) => {
        if (_.intersection([item], ActiveButton).length !== 0) {
            let arr = _.remove(ActiveButton, function (n) { return n !== item; });
            setActiveButton(arr)
        }
        else {
            setActiveButton([...ActiveButton, item])
        }
    }

    let handleDownExcel = () => {
        let returnSheet = sheet.filter(item => (_.intersection([item.partner], ActiveButton).length !== 0) ? true : false);
        for (let i = 0; i < returnSheet.length; i++) {
            delete returnSheet[i].LocalFile;
            delete returnSheet[i].addGllm;
            delete returnSheet[i].nameId;
            delete returnSheet[i].box;
            delete returnSheet[i].button;
            delete returnSheet[i].direction;
            delete returnSheet[i].width;
            delete returnSheet[i].hight;
            delete returnSheet[i].amountFile;

        }
        returnSheet = [, ...returnSheet];


        const ws = XLSX.utils.json_to_sheet(returnSheet)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, activeProduct.fileName + '.xlsx')

    }


    let returnSheet = dupItems(sheet.filter(item => (_.intersection([item.partner], ActiveButton).length !== 0) ? true : false))

    return (
        <div className='ctn-tach-vr'>

            {listVariant.map((item, key) => item[0].partner.toLowerCase().trim() === "pwser378" || item[0].partner.toLowerCase().trim() === "pwser770" ? <div className="tach-variant" key={key}>

                <button className={"bt-vr" + ((_.intersection([item[0].partner], ActiveButton).length !== 0) ? " bt-active" : "")} onClick={() => handChangeButton(item[0].partner)}>{item[0].partner}</button>

            </div> : "")
            }
            <div className="bt-sl">
                <Button type="primary" icon={<DownloadOutlined />} size={"Default"} onClick={handleDownExcel}>
                    Download
                </Button>
                <span className="sl-tachvr">Tổng: {returnSheet.length}</span>
            </div>

        </div >
    );
}

export default TachVariant; 