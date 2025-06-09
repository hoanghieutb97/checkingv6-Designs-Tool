import React, { useEffect, useState } from 'react';
import { Button, Switch } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import { useStore, actions } from '../store';
import sortSheet from '../CalcFunctions/sortSheet';
import mapSheetGllm from '../CalcFunctions/mapSheetGllm';
import checkActiveProduct from '../CalcFunctions/checkActiveProduct';
import dupItems from '../CalcFunctions/dupItems';

function InputExcel() {
    const [state, dispatch] = useStore();
    let { gllm, sheet = [], activeProduct } = state;
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
                        TikTokShipBy: item[14],
                        Priority: item[15],
                        Factory: item[16],
                        ProductionNote: item[17],
                        QCNote: item[18],
                        Status: item[19]
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
            dispatch(actions.dispatchProduct({ ...checkActiveProduct(sheet), fileName: Filename }))
        }
    }, [sheet]);

    useEffect(() => {
        if (gllm.length !== 0) {
            dispatch(actions.dispatchSheet(mapSheetGllm({ gllm, sheet: Excel })));
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

    sheet = sortSheet(sheet, activeProduct.product)

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
                ? <input type="file" className='bdffb' id="input" multiple />
                : <input type="file" className='bdffb' id="input" />
            }

            <div className="action-buttons">
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => saveTextAsFile(strWrite)}
                >
                    Download JSON
                </Button>
                
                <Button
                    icon={<ReloadOutlined />}
                    onClick={() => {
                        setExcel([]);
                    }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}

export default InputExcel;
