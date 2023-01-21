import React, { useEffect, useState } from 'react'
import { usePrice, usePriceUpdate} from './PriceContext'
import { useSelector, useDispatch} from 'react-redux'
import { update } from './redux/pricesSlice'


const Stock = ({stockTicker, stockPrice, stockTrend,...props}) => {

    const stockPrices = useSelector((state) => state.prices);  
    const dispatch = useDispatch();

    const prices = usePrice();
    const updatePrices = usePriceUpdate();

    const [ticker, setTicker] = useState(stockTicker);
    const [open] = useState(stockPrice);
    const [trend, setTrend] = useState(stockTrend);
    const [price, setPrice] = useState(stockPrice);
    const [tick, setTick] = useState(0);
    const [cycles, setCycles] = useState(0);
    const [movingAverage, setMovingAverage] = useState(stockPrice);
    const [lastMark, setLastMark] = useState(stockPrice);
    const [history, setHistory] = useState([]);

    function stockMove(stock){
        var TREND_STRENGTH_COEFFICIENT = 10; //higher = stronger/longer trends
        var PERCENT_CHANGE_COEFFICIENT = 750; // higher == smaller moves
        var TREND_PRICE_EFFECT_COEFFCIENT = 2.5; //higher == stronger price moves relative to trend value
        //var oldprice = stock.price;

        if(stock.price > lastMark && stock.price / lastMark >= 1.07){
          pullBack(stock);
        }
        else if (stock.price < lastMark && stock.price / lastMark <= 0.93){
          recover(stock);
        }

        if(stock.trend <= -2){
          stock.price = stock.price * (1 - (0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / (Math.abs(stock.trend) * TREND_PRICE_EFFECT_COEFFCIENT))) ));
          if(Math.random() > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
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
          stock.price = stock.price * (1 + (0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / (Math.abs(stock.trend) * TREND_PRICE_EFFECT_COEFFCIENT))) ));
          if(Math.random() > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
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
            stock.price = stock.price * (1 + (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
          }
          else if(Math.random() >0.9){
            stock.trend+=3;
            stock.price = stock.price * (1 +(0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / 3))));
          }
          else if(Math.random() <0.1){
            stock.trend -=3;
            stock.price = stock.price * (1 - (0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / 3))));
          }
          else{
            stock.trend -=1;
            stock.price = stock.price * (1 - (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
          }
        }
        //setStocks((stocks) => [...stocks.filter(s => s.ticker === stock.ticker), {stockTicker, newStockPrice, newStockTrend}])
        setPrice(stock.price);
        setTrend(stock.trend);
        setTick((tick) => tick+1);
        //return stock;
    
      }

    function pullBack(stock){
      console.log("pull back! : " + ticker + " from $" + stock.price + " to : $" + (stock.price*0.97).toFixed(2));
      setPrice(stock.price * 0.97);
      setTrend(0);
      setLastMark(stock.price * 0.97);
      setTick((tick) => tick+1);
    }
    function recover(stock){
      setPrice(stock.price * 1.03);
      setTrend(0);
      setLastMark(stock.price * 1.03);
      setTick((tick) => tick+1);
    }

    useEffect(()=>{
      //setStock({ticker : stockTicker, price : stockPrice, trend : stockTrend});
      if(cycles % 20 === 0){
        setLastMark(movingAverage);
      }
    },[cycles])

    useEffect(()=>{
        setHistory(history => [...history, movingAverage.toFixed(2)]);
    }, [movingAverage])


    useEffect(()=>{
      let interval = 50;
      setTimeout(() => stockMove({price : price, trend : trend}), interval);
     
      if(tick >= 25){
        setTick(0);
        setCycles(cycles => cycles+1);

        dispatch(update({ticker: ticker, price: price}));
        setMovingAverage(price);
        

      }



    },[price])

    function renderTrend(){
      if(trend < 0)
      return <div className='flex flex-row gap-6 justify-left'><div className='text-red-400 text-xs w-8'>{trend} : </div><div >${movingAverage.toFixed(2)} 
      </div></div>
      else
      return <div className='flex flex-row gap-6 justify-left'><div className='text-green-400 text-xs w-8'>{trend} : </div><div>${movingAverage.toFixed(2)}
      </div></div>
    }
    
    function changeSinceOpen(){
      return movingAverage - open;
    }

    function percentChangeSinceOpen(){
      return (changeSinceOpen() / open * 100);
    }

  return (
    <>
    <div className='text-green-400 w-[200px] text-xl flex flex-col'>{ticker}  : ${price.toFixed(2)} {renderTrend()}
    <span className='text-white text-sm'>Weekly Change :  {((price / lastMark) ).toFixed(2)}%</span>
    <span className='text-white text-sm'>Change : ${(changeSinceOpen().toFixed(2))}</span>
    <span className='text-white text-sm'>Percent Change : {(percentChangeSinceOpen().toFixed(2))}%</span>
    </div>
    </>
  )
}

export default Stock