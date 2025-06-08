
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import sortSheet from '../CalcFunctions/sortSheet';
import readXlsxFile from 'read-excel-file';
import { useStore, actions } from '../store';
import mapSheetGllm from '../CalcFunctions/mapSheetGllm';
import checkActiveProduct from '../CalcFunctions/checkActiveProduct';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dupItems from '../CalcFunctions/dupItems';
function InputExcel(props) {

    const [state, dispatch] = useStore();
    let { gllm, sheet, activeProduct } = state;
    const [Filename, setFilename] = useState();
    const [MultiExcel, setMultiExcel] = useState(false);
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

                    // if (j == 0) setExcel([...newSheet])
                    // else setExcel([...Excel, ...newSheet])
                    setExcel(listA)
                })
            }


            if (gllm.length !== 0) {

                // dispatch(actions.dispatchSheet(mapSheetGllm({ gllm, sheet: Excel })));
                let name = input.files[0].name;
                name = name.split(".");
                name.pop();
                name = name.join(".");

                setFilename(name)
            };
        })

    });
    useEffect(() => {
        dispatch(actions.dispatchProduct({ ...checkActiveProduct(sheet), fileName: Filename }))
    }, [sheet]);

    useEffect(() => {
        if (gllm.length !== 0) {
            dispatch(actions.dispatchSheet(mapSheetGllm({ gllm, sheet: Excel })));
        };
    }, [Excel]);


    let saveTextAsFile = (param) => {
        let paramToText = JSON.stringify(param)
        var textToWrite = paramToText // file contents
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

    return (<>
        <div className="">
            <span className="title-ex">Input Excel- download JSON</span>
            <span className={MultiExcel ? 'ml-3 multi-excel' : 'ml-3 singer-excel'} onClick={() => setMultiExcel(!MultiExcel)}>{MultiExcel ? "Multi" : "Singer"}</span>
        </div>

        {(MultiExcel)
            ? <input type="file" className='bdffb' id="input" multiple />
            : <input type="file" className='bdffb' id="input" />
        }

        <div className="d-flex justify-content-center mt-3 mb-2">
            <Button type="primary" icon={<DownloadOutlined />} ghost={true} size={"Default"} onClick={() => saveTextAsFile(strWrite)}>
                Download JSON
            </Button>
        </div>
    </>
    );
}

export default InputExcel;
