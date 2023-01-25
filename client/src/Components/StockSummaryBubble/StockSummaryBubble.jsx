import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { update } from '../../redux/pricesSlice'
import { incrementDays } from '../../redux/dayCounterSlice'
import { updateTradeSelection } from '../../redux/tradeSelectionSlice'
import StockSummaryChart from './StockSummaryChart'

const StockSummaryBubble = ({stockTicker, stockPrice, stockTrend, ...props}) => {
  

    //default is 250
    var tickSpeed = 150;

    //default is 15
    var dayLengthInTicks = 30;

    var summaryChartLength = 250;

    //const stockPrices = useSelector((state) => state.prices);  
    const simulation = useSelector((state) => state.simulating.state);
    const looping = useSelector((state) => state.simulating.isLooping);
    //const days = useSelector((state) => state.dayCounter);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const selectedStock = useSelector((state) => state.tradeSelection);

    const [ticker, setTicker] = useState(stockTicker);
    const [openPrice] = useState(stockPrice);
    const [trend, setTrend] = useState(stockTrend);
    const [price, setPrice] = useState(stockPrice);
    const [movingAverage, setMovingAverage] = useState(stockPrice);
    const [lastMark, setLastMark] = useState(stockPrice);
    const [history, setHistory] = useState([{x: 1, open: price, close: price, high: price, low : price}]);
    const [simulating, setSimulating] = useState(false);
    const [candleData, setCandleData] = useState({open : price, close : price, high : price, low : price});

    function stockMove(stock){

        //DECENT VALUES
        //15
        //25 or 50
        //2
        var TREND_STRENGTH_COEFFICIENT = 20; //higher = stronger/longer trends
        //250
        var PERCENT_CHANGE_COEFFICIENT = 100; // higher == smaller moves 50 works well
        var TREND_PRICE_EFFECT_COEFFCIENT = 2; //higher == stronger price moves relative to trend value
        
        

        
        function calc(baseValue){
          //default basevalue == 0.01
          return baseValue * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / (Math.abs(stock.trend) * TREND_PRICE_EFFECT_COEFFCIENT)));
        }

        if(stock.trend <= -2){
          let chance = Math.random();
          if(chance > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
            stock.trend +=1;
            stock.price = stock.price * (1 + calc(0.01));
          }
          else if(chance <= 0.05){
            stock.trend+=10;
            stock.price = stock.price * (1 + calc(0.015));
          }
          else{
            stock.trend -=1;
            stock.price = stock.price * (1 - calc(0.005));
          }
        }
        else if(stock.trend >= 2){
          let chance = Math.random();
          if(chance > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
            stock.trend -=1;
            stock.price = stock.price * (1 - calc(0.01));
          }
          else if(chance <= 0.05){
            stock.trend-=10;
            stock.price = stock.price * (1 - calc(0.015));
          }
          else{
            stock.trend +=1;
            stock.price = stock.price * (1 + calc(0.005));
          }
        }
        else {
          let chance = Math.random();
          if(chance > 0.9){
            stock.trend+=3;
            stock.price = stock.price * (1 +(0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT))));
          }
          else if(chance > 0.5){
            stock.trend +=1;
            stock.price = stock.price * (1 + (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
          }
          else if(chance < 0.1){
            stock.trend -=3;
            stock.price = stock.price * (1 - (0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT))));
          }
          else{
            stock.trend -=1;
            stock.price = stock.price * (1 - (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
          }
        }
        
        setPrice(stock.price);
        setTrend(stock.trend);
    
      }

    useEffect(()=>{
      dispatch(update({ticker: ticker, price: price}));
    }, [])

    useEffect(()=>{
      //console.log("sim status : " + simulation);
      if(simulation){
        setSimulating(true);
        setLastMark(movingAverage);
      }
    }, [simulation, looping])

    useEffect(()=>{
      // if(ticker=== "SPY"){
      //   console.log("simulating : " + simulating);
      //   console.log("history length:  " + history.length); 
      //   console.log("loop variable : " + looping); }
      if(history.length > 2 && (history.length % dayLengthInTicks === 0) && looping === false){
        //setSimulating(false);
        if(ticker === "SPY") 
        {
        dispatch(incrementDays(1));
        }
        
      }
      //if(ticker === "SPY" && history.length % 15 == 0 && history.length > 2){}
    }, [history])

    useEffect(()=>{
      if(selectedStock !== ticker){
        dispatch(updateTradeSelection({ticker: ticker}));
      }
    }, [selected]);

    useEffect(()=>{
        if(selected){
          if(ticker !== selectedStock){
            setSelected(false);
          }
        }
    }, [selectedStock, selected]);

    useEffect(()=>{
      //{x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
        //f(ticker === "SPY"){
        //console.log(candleData);
        if(history.length > 50){
          //console.log("close price : " + price);
          setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
          setCandleData({...candleData, open: price, high:price, low: price});
        }
        else {
        setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
        setCandleData({...candleData, open: price, high:price, low: price});
        }
        
        //}

    }, [movingAverage])


    useEffect(() =>{
      if(ticker === "SPY"){
      //console.log("simulating : " + simulating);
      //console.log("looping : " + looping);
      //console.log("price : " + price);
      }
      if(simulating || (simulating && looping)){
      setTimeout(()=> stockMove({price : price, trend : trend}), tickSpeed);
      dispatch(update({ticker: ticker, price: price}));
      setMovingAverage(price);
      }
      else{
        console.log("Loop ended ??? ");
        console.log("simulating : " + simulating);
        console.log("2nd condition : " + (simulating && looping));
        console.log(simulating || (simulating && looping));
      }
    }, [price, simulating]);


    useEffect(()=>{
      if(price > candleData.high) setCandleData({...candleData, high : price});

      if(price < candleData.low) setCandleData({...candleData, low : price});

    }, [price])

    function renderTrend(){
      if(trend < 0)
      return <span className='text-red-100 text-xs'>{trend}</span>
      else
      return <span className='text-green-100 text-xs'>{trend}</span>
    }
    
    function changeSinceOpen(){
      return movingAverage - openPrice;
    }

    function percentChangeSinceOpen(){
      return (changeSinceOpen() / openPrice * 100);
    }

    function handleClick(){
      setSelected(selected => !selected);
    }

  return (
    <div onClick={handleClick} 
      className={`${selectedStock === ticker ? 'border' : ""} border-deep-200 flex flex-col w-[200px] h-[100px] p-3 rounded-2xl bg-deep-900 shadow-xl`}>
    
        <div className='text-xl flex flex-row justify-between'>
          <div className='flex flex-col text-white justify-start font-normal'>
              <div className='font-normal text-lg'>{ticker}</div>
              <div className='font-light text-deep-50 text-lg'>${price.toFixed(2)}</div>
              <div className={`text-xs ${((movingAverage / lastMark) -1 < 0) ? 'text-red-500' : 'text-green-500'}`}>{(((movingAverage / lastMark) -1) * 100).toFixed(2)}%</div>
          </div>
        
          <div className='flex flex-col w-[50%] justify-end'>
          <StockSummaryChart data={history.slice(summaryChartLength * -1)} />
          </div>
      </div>
    </div>
  )
}

export default StockSummaryBubble

//
//<div onClick={handleClick} className={`p-1 rounded-lg ${selectedStock === ticker ? 'bg-transparent' : 'bg-transparent'}`}>
//<StockChart data={history.slice(-25)}/>

/**
 * <div className='flex flex-col justify-between mx-auto w-[200px]'>
    <span className='text-white text-xs'>Daily Change :  {(((movingAverage / lastMark) -1) * 100).toFixed(2)}%</span>
    <span className='text-white text-xs'>YTD Change : ${(changeSinceOpen().toFixed(2))}</span>
    <span className='text-white text-xs'>YTD Percent : {(percentChangeSinceOpen().toFixed(2))}%</span>
    </div>
 */