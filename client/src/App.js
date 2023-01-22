import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks, userLogin } from './API/API';
import Stock from './Stock';
import BuyButton from './BuyButton';
import SellButton from './SellButton';
import { useSelector, useDispatch} from 'react-redux'
import { buy, sell } from './redux/positionsSlice'; 
import { decrementCapital, incrementCapital} from './redux/capitalSlice'
import { StartSimulation, EndSimulation, toggleLoop } from './redux/simulationSlice';
import Navbar from './Components/Pages/Navigation/Navbar';
import { updatePortfolio } from './redux/portfolioSlice';

function App() {

  const positions = useSelector((state) => state.positions);
  const prices = useSelector((state) => state.prices);
  const capital = useSelector((state) => state.capital);
  const simulation = useSelector((state) => state.simulating.state);
  const looping = useSelector((state) => state.simulating.isLooping);
  const portfolio = useSelector((state) => state.portfolio);
  const tradeSelection = useSelector((state) => state.tradeSelection);
  const dispatch = useDispatch();

  const [stocks, setStocks] = useState([]);
  const [userName, setUserName] = useState();


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
    getStocks(URL).then((result)=>{setStocks(result.data)});
  }, [])

  useEffect(()=>{
    calculatePortfolio(prices, positions, capital);
  }, [prices, positions, capital])

  useEffect(()=>{
    console.log("loop status : " + looping);
    if(simulation === true && looping === false){
      console.log("no loop");
    setTimeout(()=>{endSim()}, 3000);
    }
    else return;
  }, [simulation, looping]);

  useEffect(()=>{
    if(userName !== undefined && userName !== null){
    console.log("Successfully Logged in as user : " + userName);
    }
  },[userName])

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

  function calculatePortfolio(prices, positions, capital){
    let total = capital
    
    positions.forEach(element => {
      total+=element.amount * prices.find(e => e.ticker === element.ticker).price;
    });
    dispatch(updatePortfolio({value : total}));
  }

  function renderTickers(){
    if(stocks !== [])
    return stocks.map(stock => {return (<Stock key={stock.ticker} 
      stockPrice={stock.price} stockTicker={stock.ticker} 
      stockTrend={stock.trend}/>)})
    else return <></>
  }

  function buyStock(ticker){
      let stockPrice = prices.find(obj => obj.ticker === ticker).price;
      if(capital < stockPrice) return;
      dispatch(buy({ticker : "SPY", amount: 10}));
      dispatch(decrementCapital({amount: stockPrice * 10}));
      //setCash(oldCash => oldCash - (stockPrice * 10));
    //}
  }

  function sellStock(ticker){
      let stockPrice = prices.find(obj => obj.ticker === ticker).price;
      if(positions.length === 0) return;
      if(positions.find(obj => obj.ticker === ticker).amount <= 0) return;
      dispatch(sell({ticker : "SPY", amount: 10}));
      dispatch(incrementCapital({amount: stockPrice * 10}));
      //setCash(oldCash => oldCash + (prices.find(obj => obj.ticker === "SPY").price * 10));
    //}
  }

  return (
    <div className="App flex flex-col bg-zinc-800 ">
      <Navbar user={"User"}/>
      <div className='flex flex-row gap-10 justify-center items-center h-[100px]'>
      <BuyButton buyStock={buyStock}/>
      <SellButton sellStock={sellStock}/> 
      <button onClick={startSim} className='text-lg text-white p-2 px-4 bg-zinc-900 rounded-md'>Simulate Day</button>
      <button onClick={loopSim} className='text-lg text-white p-2 px-4 bg-zinc-900 rounded-md'>Toggle Sim</button>
      </div>
      <div className='flex flex-row gap-2 bg-zinc-800 h-[50px] justify-center items-start h-screen'>
          {renderTickers()}

      </div>
    </div>
  );
}

export default App;
