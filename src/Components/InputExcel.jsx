import React, { useEffect, useState } from 'react';
import { Button, Switch } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import { useStore, actions } from '../store';
// import sortSheet from '../CalcFunctions/sortSheet';
import sortSheet from '../services/sortSheetService';
import mapSheetGllm from '../CalcFunctions/mapSheetGllm';
import checkActiveProduct from '../CalcFunctions/checkActiveProduct';
import dupItems from '../CalcFunctions/dupItems';
import { useProducts } from '../hooks/useProducts';

function InputExcel() {
    const [state, dispatch] = useStore();
    let { gllm, gllmUS, sheet = [], activeProduct } = state;
    const { products = [] } = useProducts();
    const [MultiExcel, setMultiExcel] = useState(false);
    const [Filename, setFilename] = useState();
    const [Excel, setExcel] = useState([]);

    useEffect(() => {
        const input = document.getElementById('input')
        document.getElementById('input').addEventListener('change', () => {
            var listA = [];
            for (let j = 0; j < input.files.length; j++) {
                readXlsxFile(input.files[j]).then((rows, a) => {
                    let newSheet = rows.map(item => ({
                        orderId: item[0],
                        barcode: item[1],
                        sku: (item[2] != null) ? item[2].toString() : null,
                        Quantity: item[3],
                        variant: item[4],
                        product: item[5],
                        country: item[6],
                        partner: item[7],
                        urlDesign: item[8],
                        dateItem: item[9],
                        orderName: item[10],
                        note: item[11],
                        location: item[12],
                        ItemBarcode: item[13],
                        OrderType: item[14],
                        TikTokShipBy: item[15],
                        Priority: item[16],
                        Factory: item[17],
                        ProductionNote: item[18],
                        QCNote: item[19],
                        Status: item[20]
                    }))
                    newSheet.shift(); newSheet.shift();
                    newSheet = newSheet.filter(item => item.orderId !== null);
                    listA = [...listA, ...newSheet]
                    setExcel(listA)
                })
            }

            if (gllm.length !== 0) {
                let name = input.files[0].name;
                name = name.split(".");
                name.pop();
                name = name.join(".");
                setFilename(name)
            };
        })
    });

    useEffect(() => {
        if (Array.isArray(sheet) && sheet.length > 0) {
            dispatch(actions.dispatchProduct({ ...checkActiveProduct(sheet, products), fileName: Filename }))
        }
    }, [sheet, products]);

    useEffect(() => {
        if (gllm.length !== 0) {


            const firstOrderId = Excel.filter(item => item.orderId !== null)[0]?.orderId;
            if (firstOrderId?.toLowerCase().startsWith('fko')) dispatch(actions.dispatchSheet(mapSheetGllm({ gllm: gllmUS, sheet: Excel })));
            else dispatch(actions.dispatchSheet(mapSheetGllm({ gllm: gllm, sheet: Excel })));
        }
    }, [Excel]);

    let saveTextAsFile = (param) => {
        let paramToText = JSON.stringify(param)
        var textToWrite = paramToText
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        let fileNameToSaveAs = `${activeProduct.product}-${(activeProduct.fileName)}.json`;
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }
    // let xxxx = sortSheet2(sheet, activeProduct.product, products);
    // console.log("xxxx", xxxx);

    sheet = sortSheet(sheet, activeProduct.product,products)

    let strWrite = {
        items: dupItems(sheet),
        type: activeProduct.product,
        FileName: activeProduct.FileName,
        hAll: activeProduct.hAll,
        wAll: activeProduct.wAll,
        fileName: activeProduct.fileName,
        FileDesign: JSON.parse(localStorage.ActiveFileDesign)
    };

    return (
        <div className="excel-upload-container">
            <div className="upload-header">
                <span className="title-ex">Input Excel- download JSON</span>
                <div className="mode-switch">
                    <Switch
                        checked={MultiExcel}
                        onChange={setMultiExcel}
                        checkedChildren="Multi"
                        unCheckedChildren="Single"
                    />
                </div>
            </div>

            {(MultiExcel)
                ? <input
                    type="file"
                    className='bdffb'
                    id="input"
                    multiple
                    style={{
                        width: '100%',
                        padding: '20px',
                        border: '3px dashed #d9d9d9',
                        borderRadius: '12px',
                        backgroundColor: '#fafafa',
                        fontSize: '16px',
                        cursor: 'pointer',
                        margin: '15px 0',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
                : <input
                    type="file"
                    className='bdffb'
                    id="input"
                    style={{
                        width: '100%',
                        padding: '20px',
                        border: '3px dashed #d9d9d9',
                        borderRadius: '12px',
                        backgroundColor: '#fafafa',
                        fontSize: '16px',
                        cursor: 'pointer',
                        margin: '15px 0',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            }

            <div className="action-buttons">
                <Button
                    className='w-100 h-3'
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => saveTextAsFile(strWrite)}
                    style={{ height: '50px' }}
                >
                    Download JSON
                </Button>


            </div>
        </div>
    );
}

export default InputExcel;
