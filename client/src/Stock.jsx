import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { update } from './redux/pricesSlice'
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryCandlestick, VictoryLabel} from 'victory'


const Stock = ({stockTicker, stockPrice, stockTrend, ...props}) => {
  
    const stockPrices = useSelector((state) => state.prices);  
    const simulation = useSelector((state) => state.simulating.state);
    const looping = useSelector((state) => state.simulating.isLooping);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);

    const [ticker, setTicker] = useState(stockTicker);
    const [openPrice] = useState(stockPrice);
    const [trend, setTrend] = useState(stockTrend);
    const [price, setPrice] = useState(stockPrice);
    const [tick, setTick] = useState(0);
    const [cycles, setCycles] = useState(1);
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
      //console.log("sim status : " + simulation);
      if(simulation){
        setCycles(0);
        setSimulating(true);
      }
    }, [simulation, looping])

    useEffect(()=>{
      if(history.length > 0 && history.length % 15 == 0 && looping === false){
        setSimulating(false);
        setLastMark(movingAverage);
      }
    }, [history])

    useEffect(()=>{
      //{x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
        //f(ticker === "SPY"){
        //console.log(candleData);
        if(history.length > 250){
          console.log("close price : " + price);
          setHistory([...history.slice(1), {...candleData, close: price, x: history[history.length-1].x +1}]);
          setCandleData({...candleData, open: price, high:price, low: price});
        }
        else {
        setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
        setCandleData({...candleData, open: price, high:price, low: price});
        }
        //}

    }, [movingAverage])

    // useEffect(()=>{
    //   if(simulating){
    //   //console.log("TICK : " + tick);
    //   setInterval(()=>stockMove({price : price, trend : trend}), 1000);

    //   if(tick >= 1){
    //     setTick(0);
    //     setCycles(cycles => cycles+1);
    //     dispatch(update({ticker: ticker, price: price}));
    //     //setCandleData({...candleData, close : price});
    //     setMovingAverage(price);
    //   }
    //   if(cycles > 0 && cycles % 5 === 0 && !looping){
    //     console.log("cycles : " + cycles);
    //     setSimulating(false);
    //   }
    //   }
    //   /*
    //   if(simulating){
    //   let interval = 50;
    //   setTimeout(() => stockMove({price : price, trend : trend}), interval);
    //     if(tick >= 25){
    //       setTick(0);
    //       setCycles(cycles => cycles+1);
    //       dispatch(update({ticker: ticker, price: price}));
    //       setMovingAverage(price);
    //     }
    //   }
    //   */
    // },[tick, simulating])

    useEffect(() =>{
      if(simulating || (simulating && looping)){
      setTimeout(()=> stockMove({price : price, trend : trend}), 500);
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
      return <div className='flex flex-row gap-6 justify-left'><div className='text-red-400 text-xs w-8'>{trend} : </div><div >${movingAverage.toFixed(2)} 
      </div></div>
      else
      return <div className='flex flex-row gap-6 justify-left'><div className='text-green-400 text-xs w-8'>{trend} : </div><div>${movingAverage.toFixed(2)}
      </div></div>
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
    <div className='w-[500px]'>
    <div onClick={handleClick} className={`p-2 rounded-lg ${selected === true ? 'bg-zinc-700' : 'bg-transparent'}`}
    
    >
    <div className='text-green-400  text-xl flex flex-col'>{ticker}  : ${price.toFixed(2)} {renderTrend()}
    <span className='text-white text-sm'>Daily Change :  {(((movingAverage / lastMark) -1) * 100).toFixed(2)}%</span>
    <span className='text-white text-sm'>Change : ${(changeSinceOpen().toFixed(2))}</span>
    <span className='text-white text-sm'>Percent Change : {(percentChangeSinceOpen().toFixed(2))}%</span>
    <div>

      
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 25 }}
        scale={{ x: "time" }}
        style={{
          background: { fill: "black" }
        }}
      >
      <VictoryAxis style={{ grid: { stroke: "white", } }}/>
      <VictoryAxis dependentAxis
      style={{tickLabels:{fill : "white"}}}
      />
      <VictoryCandlestick
        candleRatio={0.1}
        candleWidth={3}
        candleColors={{ positive: "#22c55e", negative: "#c43a31" }}
        data={history}
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