import React, { createContext, useState, useEffect } from 'react';
import * as constants from './constants';
import axios from 'axios';
import { StoreProvider } from './store';



function DefaultApp(props) {

    // const [APIGLLM, setAPIGLLM] = useState();
    // const [gllmAPI, setgllmAPI] = useState();

    // useEffect(() => { // fetch GLLM
    //     async function fetchData() {
    //         const result = await axios(constants.GLLM);
    //         setAPIGLLM({ items: result.data });
    //     }
    //     fetchData();
    // }, []);

    // console.log(GLLMContext);
    if (localStorage.FileDesign === undefined) localStorage.FileDesign = "[]";
    if (localStorage.ActiveFileDesign === undefined) localStorage.ActiveFileDesign = JSON.stringify("~/Desktop/xoa");
    return (

        <StoreProvider>
            {props.children}
        </StoreProvider>

    );
}

// export { GLLMContext };

export default DefaultApp;