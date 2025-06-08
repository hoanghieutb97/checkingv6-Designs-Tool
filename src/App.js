import React, { useEffect, useState } from 'react';
import Navbar from './Layout/Navbar';
import Body from './Layout/Body';
import { useStore, actions } from './store';
import axios from 'axios';
import * as constants from './constants';
import AddActiveLocalFile from './Components/AddActiveLocalFile';

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
    <React.Fragment>
      {loadding === true ? <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div> : ""}
      <Navbar />
      <Body />

    </React.Fragment>
  );
}

export default App;

