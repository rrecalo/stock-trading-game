import './App.css';
import React, {useState, useEffect} from 'react';
import { getStocks, updateStock, userLogin } from './API/API';
import Stock from './Stock';

function App() {

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
    //if(result.data.userName !== undefined || result.data.userName !== null )
    userLogin(URL, "user1", "1372").then((result)=>{setUser(result.data)}, (result) => {console.log(result)});
    getStocks(URL).then((result)=>{setStocks(result.data)});
    //updateStock(URL, "user1", "SPY", 419).then((result)=> console.log(result));
  }, [])

  useEffect(()=>{
    //setTimeout(()=>{gameTick()}, 1000);


  }, [stocks]);

  useEffect(()=>{
    if(userName !== undefined && userName !== null){
    console.log("Successfully Logged in as user : " + userName);
    }
  },[userName])

  function gameTick(){
    setStocks(stocks.map((stock) =>{
      return stockMove(stock);
    }));
  }

  function stockMove(stock){
    /**
    var oldprice = stock.price;
    if(stock.trend <= -2){
      stock.price = stock.price * (1- (Math.random() / 1000));
      if(Math.random() > (1 / Math.abs(stock.trend))){
        stock.trend += 1;
      }
      else stock.trend -= 1;
    }
    else if(stock.trend >= 2){
      stock.price = stock.price * (1 + (Math.random() / 1000));
      if(Math.random() > (1 / Math.abs(stock.trend))){
        stock.trend -= 1;
      }
      else stock.trend +=1;
    }
    else {
      stock.price = stock.price * (1 + (Math.random() / 2000));
      if(Math.random() > 0.5){
        stock.trend += 1;
      }
      else stock.trend -= 1;
    }

    if(oldprice < stock.price)
      console.log(stock.price - oldprice);
    else 
      console.log(oldprice - stock.price);
    */
    var oldprice = stock.price;
    if(stock.trend <= -2){
      stock.price = stock.price * (1 - (0.01 * (Math.random() / (750 / Math.abs(stock.trend))) ));
      if(Math.random() > (1 / Math.abs(stock.trend / 2))){
        stock.trend +=1;
      }
      else if(Math.random() <= 0.05){
        stock.trend+=10;
      }
      else{
        stock.trend -=1;
      }
    }
    else if(stock.trend >= 2){
      stock.price = stock.price * (1 + (0.01 * (Math.random() / (750 / Math.abs(stock.trend))) ));
      if(Math.random() > (1 / Math.abs(stock.trend / 2))){
        stock.trend -=1;
      }
      else if(Math.random() <= 0.05){
        stock.trend-=10;
      }
      else{
        stock.trend +=1;
      }
    }
    else {
      if(Math.random() > 0.5){
        stock.trend +=1;
        stock.price = stock.price * (1 + (0.01 * (Math.random() / 750)));
      }
      else if(Math.random() >0.9){
        stock.trend+=3;
        stock.price = stock.price * (1 +(0.01 * (Math.random() / (750 / 3))));
      }
      else if(Math.random() <0.1){
        stock.trend -=3;
        stock.price = stock.price * (1 - (0.01 * (Math.random() / (750 / 3))));

      }
      else{
        stock.trend -=1;
        stock.price = stock.price * (1 - (0.01 * (Math.random() / 750)));

      }
    }
    // if(oldprice < stock.price)
    //   console.log(stock.price - oldprice);
    // else 
    //   console.log(oldprice - stock.price);
    return stock;

  }

  function renderTickers(){
    if(stocks !== [])
    return stocks.map(stock => {return (<Stock key={stock.ticker} stockPrice={stock.price} stockTicker={stock.ticker} stockTrend={stock.trend}/>)})
    else return <></>
  }


  return (
    <div className="App">
      <div className='flex flex-row gap-6 bg-gray-800 h-[50px] justify-center items-center h-screen'>
        {renderTickers()}
      </div>
    </div>
  );
}

export default App;
