import React from "react";
import RotasApp from "./rotas";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App(){
  return(
    <div className="app">
      <ToastContainer autoClose={3000}/>
      <RotasApp/>
    </div>
  );
}

export default App;