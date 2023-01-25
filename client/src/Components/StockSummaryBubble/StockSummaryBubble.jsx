import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { update } from '../../redux/pricesSlice'
import { incrementDays } from '../../redux/dayCounterSlice'
import { updateTradeSelection } from '../../redux/tradeSelectionSlice'
import StockSummaryChart from './StockSummaryChart'

const StockSummaryBubble = ({stockTicker, stockPrice, stockTrend, ...props}) => {
  

    //default is 250

    //default is 15
    var dayLengthInTicks = 30;

    var summaryChartLength = 250;

    //const stockPrices = useSelector((state) => state.prices);  
    const prices = useSelector((state) => state.prices);
    const stockHistory = useSelector((state) => state.history);
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
    const [summaryData, setSummaryData] = useState([]);
    const [candleData, setCandleData] = useState({open : price, close : price, high : price, low : price});


    useEffect(()=>{
      if(prices.length > 0){
        var newStockObj = prices.find(e => e.ticker === ticker);
        setPrice(newStockObj.price);
      }
    }, [prices]);

    useEffect(()=>{
      //console.log("sim status : " + simulation);
      if(simulation){
        setSimulating(true);
        setLastMark(movingAverage);
      }
    }, [simulation, looping])

    useEffect(()=>{
      if(prices.length > 0){
      let stock = prices.find(stock => stock.ticker === ticker);
      if(stock.last !== lastMark){
        setLastMark(stock.last);
      }
    }
    }, [prices])
    
    useEffect(()=>{
      // if(history.length > 50){
      //   //console.log("close price : " + price);
      //   setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
      //   setCandleData({...candleData, open: price, high:price, low: price});
      // }
      // else {
      // setHistory([...history, {...candleData, close: price, x: history[history.length-1].x +1}]);
      // setCandleData({...candleData, open: price, high:price, low: price});
      // }
      if(stockHistory.length > 0){
        setSummaryData(stockHistory.find(stock=>stock.ticker === ticker).history);
      }
    },[stockHistory])







    useEffect(() =>{
      if(ticker === "SPY"){
      //console.log("simulating : " + simulating);
      //console.log("looping : " + looping);
      //console.log("price : " + price);
      }
      if(simulating || (simulating && looping)){
      //setTimeout(()=> stockMove({price : price, trend : trend}), tickSpeed);
      //dispatch(update({ticker: ticker, price: price}));
      setMovingAverage(price);
      }
      else{
        /**
        console.log("Loop ended ??? ");
        console.log("simulating : " + simulating);
        console.log("2nd condition : " + (simulating && looping));
        console.log(simulating || (simulating && looping));
         */
      }
    }, [price, simulating]);


    useEffect(()=>{
      if(price > candleData.high) setCandleData({...candleData, high : price});

      if(price < candleData.low) setCandleData({...candleData, low : price});

    }, [price])

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

    //deprecated???? i guess - the trend is mostly for backend code, not for user to see/use anyway
    // function renderTrend(){
    //   if(trend < 0)
    //   return <span className='text-red-100 text-xs'>{trend}</span>
    //   else
    //   return <span className='text-green-100 text-xs'>{trend}</span>
    // }
    


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
            <StockSummaryChart data={summaryData.slice(summaryChartLength * -1)} />
          </div>
      </div>
    </div>
  )
}

export default StockSummaryBubble
