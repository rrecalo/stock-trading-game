import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks, userLogin } from './API/API';
import Stock from './Stock';
import PriceProvider from './PriceContext';
import BuyButton from './BuyButton';
import SellButton from './SellButton';
import { useSelector, useDispatch} from 'react-redux'
import { buy, sell } from './redux/positionsSlice'; 
import { decrementCapital, incrementCapital} from './redux/capitalSlice'

function App() {

  const positions = useSelector((state) => state.positions);
  const prices = useSelector((state) => state.prices);
  const capital = useSelector((state) => state.capital);
  const dispatch = useDispatch();

  const [stocks, setStocks] = useState([]);
  const [userName, setUserName] = useState();


  //LIVE URL 
  let URL = "https://stock-trading-game-server.onrender.com";
  
  //*** FOR DEV ***
  //let URL ="http://localhost:3001";


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

  }, [stocks]);

  useEffect(()=>{
    if(userName !== undefined && userName !== null){
    console.log("Successfully Logged in as user : " + userName);
    }
  },[userName])


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
    <div className="App flex flex-col bg-gray-800 items-center">
      <div className="mx-auto pt-[200px] pb-[25px] text-white text-2xl">Balance : {capital.toFixed(2)}</div>
      <div className='flex flex-row gap-6 bg-gray-800 h-[50px] justify-center items-start h-screen'>
        <PriceProvider values={[]} children={
          (<><BuyButton buyStock={buyStock}/><SellButton sellStock={sellStock}/> {renderTickers()} </>) 
          }>
        </PriceProvider>
      </div>
    </div>
  );
}

export default App;
