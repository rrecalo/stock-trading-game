import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks } from './API/API';

function App() {

  const [stock, setStocks] = useState();

  useEffect(()=>{console.log(getStocks())},[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
