import React,{useContext} from 'react';
import loader_light from './loader_light.gif';
import loader_dark from './loader_dark.gif';
import noteContext from "../context/Notes/noteContext";


function Loader() {
    const a = useContext(noteContext);
  return (
<>
      {a.state.mode==="dark"?<img src={loader_dark} alt='loader'/>:<img src={loader_light} alt='loader'/>}
   </> 
  );
}

export default Loader;
