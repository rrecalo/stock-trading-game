import React, { useEffect, useState } from 'react'

const Stock = ({stockTicker, stockPrice, stockTrend, ...props}) => {

    const [ticker, setTicker] = useState(stockTicker);
    const [trend, setTrend] = useState(stockTrend);
    const [price, setPrice] = useState(stockPrice);
    const [tick, setTick] = useState(0);
    const [movingAverage, setMovingAverage] = useState(stockPrice);

    function stockMove(stock){

      
        var TREND_STRENGTH_COEFFICIENT = 20; //higher = stronger/longer trends
        var PERCENT_CHANGE_COEFFICIENT = 750; // higher == smaller moves
        var TREND_PRICE_EFFECT_COEFFCIENT = 1; //higher == stronger price moves relative to trend value

        var oldprice = stock.price;
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
        // if(oldprice < stock.price)
        //   console.log(stock.price - oldprice);
        // else 
        //   console.log(oldprice - stock.price);
        setPrice(stock.price);
        setTrend(stock.trend);
        setTick((tick) => tick+1);
        //return stock;
    
      }

    useEffect(()=>{
      //setStock({ticker : stockTicker, price : stockPrice, trend : stockTrend});
    },[])

    useEffect(()=>{
      //console.log(stock.price);
      setTimeout(() => stockMove({price : price, trend : trend}), 100);
      if(tick >= 100){
        setTick(0);
        setMovingAverage(price);
      }
      // setTimeout(() => {setStock(stockMove(stock))}, 500);
    },[price])

    function renderTrend(){
      if(trend < 0)
      return <div className='flex flex-row gap-6 justify-left'><div className='text-red-400 text-xs w-8'>{trend} : </div><div >${movingAverage.toFixed(2)}</div></div>
      else
      return <div className='flex flex-row gap-6 justify-left'><div className='text-green-400 text-xs w-8'>{trend} : </div><div>${movingAverage.toFixed(2)}</div></div>
    }

  return (
    <div className='text-green-400 w-[200px] text-xl'>{ticker}  : ${price.toFixed(2)} {renderTrend()}</div>
  )
}

export default Stock