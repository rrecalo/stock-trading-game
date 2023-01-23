import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { update } from './redux/pricesSlice'
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryCandlestick, VictoryLabel} from 'victory'
import { incrementDays } from './redux/dayCounterSlice'
import { updateTradeSelection } from './redux/tradeSelectionSlice'

const Stock = ({stockTicker, stockPrice, stockTrend, ...props}) => {
  
    var tickSpeed = 250;
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

        //10, 750, 2.5
        var TREND_STRENGTH_COEFFICIENT = 15; //higher = stronger/longer trends
        var PERCENT_CHANGE_COEFFICIENT = 25; // higher == smaller moves 50 works well
        var TREND_PRICE_EFFECT_COEFFCIENT = 2; //higher == stronger price moves relative to trend value
        
        /**
        if(stock.price > lastMark && stock.price / lastMark >= 1.03){
          pullBack(stock);
          return;
        }
        else if (stock.price < lastMark && stock.price / lastMark <= 0.97){
          recover(stock);
          return;
        }

        let oldPrice = stock.price;
        
        
        var baseVal = 0.01;
        function randomMove(base){
          return (baseVal * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / stock.trend)));
        }

        function upMove(sp){
          return sp * (1 + randomMove(0.005));
        }
        function downMove(sp){
          return sp * (1 - randomMove(0.005));
        }
        function neutralMove(sp){
          if(Math.random() > 0.5){
            return sp * (1 + randomMove(0.0025));
          }
          else return sp * (1 - randomMove(0.0025));
        }
        let chance = Math.random();
        if(stock.trend > 5){
          chance = 0;
        }
        if (stock.trend < -5){
          chance  = 1;
        }
        if(chance > 0.5){
          stock.price = upMove(stock.price);
          stock.trend += 1;
        }
        else if (chance < 0.4){
          stock.price = downMove(stock.price);
          stock.trend -= 1;
        }
        else{
          stock.price = downMove(stock.price);
        }
         */
        function calc(baseValue){
          //default basevalue == 0.01
          return baseValue * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / (Math.abs(stock.trend) * TREND_PRICE_EFFECT_COEFFCIENT)));
        }
        //sP * (1 - (

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
        
        //let fixed = parseInt(stock.price).toFixed(2);
        //setPrice(Math.round(stock.price * 1000) / 1000);
        //if(ticker === "SPY") console.log(stock.price - oldPrice);
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
      }
    }, [simulation, looping])

    useEffect(()=>{
      if(ticker=== "SPY"){
        console.log("simulating : " + simulating);
        console.log("history length:  " + history.length); 
        console.log("loop variable : " + looping); }
      if(history.length > 2 && (history.length % 15 === 0) && looping === false){
        setSimulating(false);
        setLastMark(movingAverage);
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
      if(simulating || (simulating && looping)){
      setTimeout(()=> stockMove({price : price, trend : trend}), tickSpeed);
      dispatch(update({ticker: ticker, price: price}));
      setMovingAverage(price);
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
    <div className='w-[250px] flex flex-col justify-center items-center'>
    <div onClick={handleClick} className={`p-1 rounded-lg ${selectedStock === ticker ? 'bg-zinc-700' : 'bg-transparent'}`}>
   
    <div className='text-green-400  text-xl flex flex-col whitespace-nowrap '>
    <div className='flex flex-row justify-between mx-auto w-[200px]'>
      <div>{ticker}{renderTrend()}</div>
      <div>${price.toFixed(2)}</div>
      </div>
    <div className='flex flex-col justify-between mx-auto w-[200px]'>
    <span className='text-white text-xs'>Daily Change :  {(((movingAverage / lastMark) -1) * 100).toFixed(2)}%</span>
    <span className='text-white text-xs'>YTD Change : ${(changeSinceOpen().toFixed(2))}</span>
    <span className='text-white text-xs'>YTD Percent : {(percentChangeSinceOpen().toFixed(2))}%</span>
    </div>
    <div className='w-[250px]'>

      
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: 10 }}
        scale={{ x: "" }}
        style={{
          background: { fill: "black" }
        }}
      >
      <VictoryAxis style={{ grid: { stroke: "white", } }}/>
      <VictoryAxis dependentAxis
      style={{tickLabels:{fill : "white"}}}
      />
      <VictoryCandlestick
        candleRatio={1}
        candleWidth={5}
        candleColors={{ positive: "#22c55e", negative: "#c43a31" }}
        data={history.slice(-50)}
        open="open"
        low="low"
        high="high"
        highLabelComponent={<VictoryLabel className='text-white text-3xl'/>}
        wickStrokeWidth={2}
        //domain={{y:[movingAverage * 0.99, movingAverage * 1.01]}}
      />
      </VictoryChart>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Stock