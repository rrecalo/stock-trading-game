import React, {useEffect, useState} from 'react'
import stockAlgo from './stockAlgo'
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/pricesSlice';
import { updateHistory } from '../redux/stockHistory';

const StockSimulation = ({stocks, ...props}) => {

  //default is 100
  var tickSpeed = 100;


  const simulation = useSelector((state) => state.simulating.state);
  const prices = useSelector((state) => state.prices);
  const [stockData, setStockData] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(stocks.length > 0){
      setStockData(stocks.map(stock => ({ticker: stock.ticker, price: stock.price, trend: 0})))
      stocks.forEach((stock) => {
      dispatch(update({ticker: stock.ticker, price: stock.price, history: []}));
      });
    }
  },[stocks])

  useEffect(()=>{
    //console.log(stockData);
  },[stockData]); 

  useEffect(()=>{
    
    if(simulation){
      setTimeout(()=>runSimulation(stockData), 1000);
    }

  }, [simulation])

  useEffect(()=>{
    
    if(simulation){
    setTimeout(()=>runSimulation(stockData), tickSpeed);
    }
    if(stockData !== []){
      updateStocks(stockData);
      //updateStocksHistory(stockData);
    }
  }, [stockData])

  useEffect(()=>{
    if(prices.length > 0){
      updateStocksHistory(prices);
    }
  }, [prices])

  // useEffect(()=>{
  //   //{x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
  //     //f(ticker === "SPY"){
  //     //console.log(candleData);
  //     if(history.length > 50){
  //       //console.log("close price : " + price);
  //       setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
  //       setCandleData({...candleData, open: price, high:price, low: price});
  //     }
  //     else {
  //     setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
  //     setCandleData({...candleData, open: price, high:price, low: price});
  //     }
      
  //     //}

  // }, [movingAverage])

  
  function runSimulation(stocks) {
    var newPrices = []
    stocks.forEach(stock => {
      newPrices.push(stockAlgo(stock));
    })
    setStockData(newPrices);
  }

  function updateStocks(stocks){
    stocks.forEach(stock =>{
      //if()
      dispatch(update({ticker: stock.ticker, price: stock.price, history: [...prices.find(e => e.ticker === stock.ticker).history, prices.find(e => e.ticker === stock.ticker).price]}));
    })
  }

  function updateStocksHistory(stocks){
    stocks.forEach(stock =>{
      dispatch(updateHistory({ticker:stock.ticker, history: stock.history}));
    });
  }



  return (
    <></>
  )
}

export default StockSimulation