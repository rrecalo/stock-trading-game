import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { update } from './redux/pricesSlice'


const Stock = ({stockTicker, stockPrice, stockTrend, ...props}) => {
  
    const stockPrices = useSelector((state) => state.prices);  
    const simulation = useSelector((state) => state.simulating.state);
    const looping = useSelector((state) => state.simulating.isLooping);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);

    const [ticker, setTicker] = useState(stockTicker);
    const [open] = useState(stockPrice);
    const [trend, setTrend] = useState(stockTrend);
    const [price, setPrice] = useState(stockPrice);
    const [tick, setTick] = useState(0);
    const [cycles, setCycles] = useState(1);
    const [movingAverage, setMovingAverage] = useState(stockPrice);
    const [lastMark, setLastMark] = useState(stockPrice);
    const [history, setHistory] = useState([]);
    const [simulating, setSimulating] = useState(false);

    function stockMove(stock){

        //10, 750, 2.5
        var TREND_STRENGTH_COEFFICIENT = 10; //higher = stronger/longer trends
        var PERCENT_CHANGE_COEFFICIENT = 250; // higher == smaller moves
        var TREND_PRICE_EFFECT_COEFFCIENT = 3; //higher == stronger price moves relative to trend value

        if(stock.price > lastMark && stock.price / lastMark >= 1.03){
          pullBack(stock);
          return;
        }
        else if (stock.price < lastMark && stock.price / lastMark <= 0.97){
          recover(stock);
          return;
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
        setPrice(stock.price);
        setTrend(stock.trend);
        setTick((tick) => tick+1);
    
      }

    function pullBack(stock){
      //console.log("pull back! : " + ticker + " from $" + stock.price + " to : $" + (stock.price*0.97).toFixed(2));
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
      console.log("sim status : " + simulation);
      if(simulation){
        setCycles(0);
        setSimulating(true);
      }
  }, [simulation, looping])


    useEffect(()=>{
      if(simulating){
      setTimeout(()=>stockMove({price : price, trend : trend}), 100);
      if(tick >= 10){
        setTick(0);
        setCycles(cycles => cycles+1);
        dispatch(update({ticker: ticker, price: price}));
        setMovingAverage(price);
      }
      if(cycles > 0 && cycles % 5 === 0 && !looping){
        console.log("cycles : " + cycles);
        setSimulating(false);
      }
      }
      /*
      if(simulating){
      let interval = 50;
      setTimeout(() => stockMove({price : price, trend : trend}), interval);
        if(tick >= 25){
          setTick(0);
          setCycles(cycles => cycles+1);
          dispatch(update({ticker: ticker, price: price}));
          setMovingAverage(price);
        }
      }
      */
    },[tick, simulating])

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

    function handleClick(){
      setSelected(selected => !selected);
    }

  return (
    <div className='w-[200px]'>
    <div onClick={handleClick} className={`p-2 rounded-lg ${selected === true ? 'bg-zinc-700' : 'bg-transparent'}`}
    
    >
    <div className='text-green-400  text-xl flex flex-col'>{ticker}  : ${price.toFixed(2)} {renderTrend()}
    <span className='text-white text-sm'>Daily Change :  {(((price / lastMark) -1) * 100).toFixed(2)}%</span>
    <span className='text-white text-sm'>Change : ${(changeSinceOpen().toFixed(2))}</span>
    <span className='text-white text-sm'>Percent Change : {(percentChangeSinceOpen().toFixed(2))}%</span>
    </div>
    </div>
    </div>
  )
}

export default Stock