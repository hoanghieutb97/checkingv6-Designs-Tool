import React, { useDebugValue, useEffect, useState } from 'react';
import { useStore, actions } from '../store';
import copy from 'copy-to-clipboard';
import UploadForm from './UploadForm';

function CopyOrderId(props) {
    const [state, dispatch] = useStore();
    const { gllm, sheet } = state;
    const [ValueP, setValueP] = useState("");
    let copyOrderId = () => {
        let arr = sheet.map(item => (" " + item.orderId + "\n")).join("");
        copy(arr);

    }
    useEffect(() => {
        if (localStorage.NameFolder === undefined) localStorage.NameFolder = JSON.stringify("");
        else setValueP(JSON.parse(localStorage.NameFolder))
    }, []);
    let setNameFolder = (item) => {
        localStorage.NameFolder = JSON.stringify(item)
    }


    return (
        <>
            <button className="btc-orderid" onClick={copyOrderId}>Copy Order</button>

            <input className='kjvbskvsjn' onChange={(e) => setNameFolder(e.target.value)} defaultValue={ValueP}></input>
            <UploadForm />
          {localStorage.NameFolder!==undefined?  <p className='vsjdhvs' >\\192.168.1.194\design\{JSON.parse(localStorage.NameFolder)}</p>:""}

        </>
    );
}

export default CopyOrderId;