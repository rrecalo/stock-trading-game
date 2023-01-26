import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import FocusedStockChart from './FocusedStockChart'

const FocusedStock = () => {

    const tradeSelection = useSelector((state) => state.tradeSelection);
    const [summaryData, setSummaryData] = useState([]);
    const stockHistory = useSelector((state) => state.history);

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
        if(stockHistory.length > 0 && tradeSelection !== ""){
          setSummaryData(stockHistory.find(stock=>stock.ticker === tradeSelection).history);
        }
      },[stockHistory])

  return (
    <div className='w-full h-[300px]'>
        <svg style={{height:0}}>
        <defs>
                <filter id="f1" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
                <linearGradient id="gradient-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" />
                    <stop offset="1" />
                </linearGradient>
                <linearGradient id="gradient-3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" />
                    <stop offset="1" />
                </linearGradient>
            </defs>
        </svg>
        <FocusedStockChart data={summaryData}/>
    </div>
  )
}

export default FocusedStock