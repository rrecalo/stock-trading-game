import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks, userLogin } from './API/API';
import Navbar from './Components/Pages/Navigation/Navbar';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import {Routes, Route} from 'react-router-dom'
import Analytics from './Components/Pages/Analytics/Analytics';
import Positions from './Components/Pages/Positions/Positions';
import Trade from './Components/Pages/Trade/Trade';
import {useSelector, useDispatch} from 'react-redux';
import { StartSimulation, EndSimulation, toggleLoop } from './redux/simulationSlice';
import { updatePortfolio } from './redux/portfolioSlice';
import StockSimulation from './Components/StockSimulation';


function App() {


  const simulation = useSelector((state) => state.simulating.state);
  const positions = useSelector((state) => state.positions);
  const prices = useSelector((state) => state.prices);
  const capital = useSelector((state) => state.capital);
  const portfolio = useSelector((state) => state.portfolio);
  //const tradeSelection = useSelector((state) => state.tradeSelection);
  
  const dispatch = useDispatch();

  const [userName, setUserName] = useState();
  const [stocks, setStocks] = useState([]);
  

  //LIVE URL 
  let URL = "https://stock-trading-game-server.onrender.com";
  
  //*** FOR DEV ***
  //let URL = "http://localhost:3001";

  

  function setUser(userData){
    if(userData === null || userData ===  undefined){
      console.log("Unsuccessful login attempt");
      return;
    }
    else setUserName(userData.userName);
    return;
  }

  useEffect(()=>{
    userLogin(URL, "user1", "1372").then((result)=>{setUser(result.data)}, (result) => {console.log(result)});
    //getStocks(URL).then((result)=>{setStocks(result.data)});
  }, [])

  useEffect(()=>{
    if(stocks.length === 0){
      setTimeout(()=>{getStocks(URL).then((result)=>{setStocks(result.data)}); console.log("FETCH!");}, 500);
    }
  }, [stocks])

  useEffect(()=>{
    calculatePortfolio(prices, positions, capital);
    
}, [prices, positions, capital])



function calculatePortfolio(prices, positions, capital){
  let total = capital;
  let oldPortfolioValue = portfolio.value;
  
  positions.forEach(element => {
      total+=element.amount * prices.find(e => e.ticker === element.ticker).price;
  });
    //ONLY update portfolio value if the value is Different!!
    if(total !== portfolio){
    dispatch(updatePortfolio({value : total, history: [...portfolio.history, oldPortfolioValue]}));
    }
  }

  function startSim(){
    if(simulation == false){
    console.log("Simulation started");
    dispatch(StartSimulation());
    }
    else {console.log("already running!!!")};
  }
  function endSim(){
      dispatch(EndSimulation());
  }
  function loopSim(){
      dispatch(toggleLoop());
  }

 

  

  useEffect(()=>{
    if(userName !== undefined && userName !== null){
    console.log("Successfully Logged in as user : " + userName);
    }
  },[userName])


  return (
    <div className="App flex flex-row bg-deep-800 h-screen w-full">
        <StockSimulation stocks={stocks}/>
        <div className='w-[15%]'>
        <Navbar />
        </div>
        <div className='flex flex-col bg-deep-800 m-auto w-[85%] h-[90%] rounded-2xl'>
          <Routes>
            <Route path="/*" element={<Dashboard stocks={stocks} startSim={startSim}/>} />
            <Route path="/trade" element={<Trade />}/>
            <Route path="/positions" element={<Positions />}/>
            <Route path="/analytics" element={<Analytics />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;

//<button onClick={loopSim} className='text-lg text-white p-2 px-4 bg-zinc-900 rounded-md'>Toggle Loop</button>




/**
 * 
 * <div className='flex flex-row gap-4 justify-center items-start bg-zinc-800 pt-[25px]'>
          
        <div className='text-green-500 text-xl w-[25%]'>
            <span className='text-white '>Cash Balance : </span>${capital.toFixed(2)}
        </div>
        
        
        </div>
      <div className='flex flex-row flex-wrap gap-8 bg-zinc-800 justify-center items-start h-fit pt-[25px]'>
          {renderTickers()}

      </div>
 * 
 */