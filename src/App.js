import React, { useEffect, useState } from 'react';
import Navbar from './Layout/Navbar';
import Body from './Layout/Body';
import { useStore, actions } from './store';
import axios from 'axios';
import * as constants from './constants';
import AddActiveLocalFile from './Components/AddActiveLocalFile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Products from './Layout/Products';

const queryClient = new QueryClient();

function App(props) {
  const [state, dispatch] = useStore();
  const { gllm, sheet } = state
  const [loadding, setloadding] = useState(true);
  useEffect(() => { // fetch GLLM
    async function fetchData() {
      var gllmAPI = await axios(constants.GLLM);
      gllmAPI =gllmAPI.data.filter(item=>item.width!==null)
      // console.log(gllmAPI);
      dispatch(actions.dispatchGLLM(gllmAPI));
      setloadding(false)
    }
    fetchData();
  }, []);

  // console.log(gllm);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        
        {loadding === true ? <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div> : ""}
        <Navbar />
        <Body />
      </div>
    </QueryClientProvider>
  );
}

export default App;

