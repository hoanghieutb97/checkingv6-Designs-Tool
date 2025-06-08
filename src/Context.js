import React, { createContext,useState ,useEffect} from 'react';
import axios from 'axios';
import * as constants from './constants';
const GLLMContext = createContext();
function Context(props) {

    const [APIGLLM, setAPIGLLM] = useState();
    const [gllmAPI, setgllmAPI] = useState();

    useEffect(() => { // fetch GLLM
        async function fetchData() {
            const result = await axios(constants.GLLM);
            GLLMContext = { items: result.data }
            setAPIGLLM({ items: result.data });
        }
        fetchData();
    }, []);
     console.log(GLLMContext);
    return (
        <div>

        </div>
    );
}

export { GLLMContext };