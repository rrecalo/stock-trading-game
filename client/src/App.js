import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks, updateStock, userLogin } from './API/API';
import Stock from './Stock';
import PriceProvider from './PriceContext';
import { usePrice } from './PriceContext';
import BuyButton from './BuyButton';
import SellButton from './SellButton';

function App() {

  const [stocks, setStocks] = useState([]);
  const [userName, setUserName] = useState();
  const [cash, setCash] = useState(10000);
  const [assets, setAssets] = useState([]);

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
    //setPrices(stocks.map((stock)=>[stock.ticker, stock.price]));
    setAssets(stocks.map((stock)=>[stock.ticker, 0]));

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

  function buyStock(prices){
    if(cash > prices[0][1]){
      console.log("buy initiated!");
      setAssets(oldAssets => [...oldAssets.filter(asset => asset[0] !== "SPY"), ["SPY", oldAssets.find(e => e[0] === "SPY")[1]+10]]);
      console.log(assets);
      setCash(oldCash => oldCash - (prices[0][1] * 10));
    }
  }

  function sellStock(prices){
    let index = assets.indexOf(assets.find(e => e[0] === "SPY"));
    if(assets[index][1] > 0){
      console.log("sell initiated!");
      setAssets(oldAssets => [...oldAssets.filter(asset => asset[0] !== "SPY"), ["SPY", oldAssets.find(e => e[0] === "SPY")[1]-10]]);
      console.log(assets);
      setCash(oldCash => oldCash + (prices[0][1] * 10));
    }
  }

  return (
    <div className="App flex flex-col bg-gray-800 items-center">
      <div className="mx-auto pt-[200px] pb-[25px] text-white text-2xl">Balance : {cash.toFixed(2)}</div>
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
