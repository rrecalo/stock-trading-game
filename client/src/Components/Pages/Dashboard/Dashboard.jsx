import React, {useState, useEffect} from 'react'
import PortfolioChart from '../../PortfolioChart';
import StockSummaryBubble from '../../StockSummaryBubble/StockSummaryBubble';
import BuyButton from '../../BuyButton';
import SellButton from '../../SellButton';
import { useSelector, useDispatch} from 'react-redux'
import { buy, sell } from '../../../redux/positionsSlice'
import { decrementCapital, incrementCapital} from '../../../redux/capitalSlice'
import { StartSimulation, EndSimulation, toggleLoop } from '../../../redux/simulationSlice';
import { updatePortfolio } from '../../../redux/portfolioSlice';


const Dashboard = ({stocks,...props}) => {

    const positions = useSelector((state) => state.positions);
    const prices = useSelector((state) => state.prices);
    const capital = useSelector((state) => state.capital);
    const simulation = useSelector((state) => state.simulating.state);
    const looping = useSelector((state) => state.simulating.isLooping);
    const portfolio = useSelector((state) => state.portfolio);
    const [viewYTD, setViewYTD] = useState(false);


    const dispatch = useDispatch();




    useEffect(()=>{
        calculatePortfolio(prices, positions, capital);
    }, [prices, positions, capital])

    useEffect(()=>{
        //console.log("loop status : " + looping);
        if(simulation === true && looping === false){
          console.log("loop disabled");
          //setTimeout(()=>{endSim();}, 4000);
          
        }
        else return;
    }, [simulation, looping]);


    function handleViewChange() {
        setViewYTD(prev => !prev);
      }
    
    function calculatePortfolio(prices, positions, capital){
    let total = capital
    
    positions.forEach(element => {
        total+=element.amount * prices.find(e => e.ticker === element.ticker).price;
    });

    //ONLY update portfolio value if the value is Different!!
    if(total !== portfolio){
    dispatch(updatePortfolio({value : total}));
    }
    }

    function renderStockBubbles(){
    if(stocks !== [])
    return stocks.map(stock => {return (<StockSummaryBubble key={stock.ticker} 
        stockPrice={stock.price} stockTicker={stock.ticker} 
        stockTrend={stock.trend}/>)})
    else return <></>
    }

    function buyStock(ticker){
        let stockPrice = prices.find(obj => obj.ticker === ticker).price;
        if(capital < stockPrice) return;
        dispatch(buy({ticker : ticker, amount: 10}));
        dispatch(decrementCapital({amount: stockPrice * 10}));
        //setCash(oldCash => oldCash - (stockPrice * 10));
    //}
    }

    function sellStock(ticker){
        let stockPrice = prices.find(obj => obj.ticker === ticker).price;
        if(positions.length === 0) return;
        if(positions.find(obj => obj.ticker === ticker).amount <= 0) return;
        dispatch(sell({ticker : ticker, amount: 10}));
        dispatch(incrementCapital({amount: stockPrice * 10}));
        //setCash(oldCash => oldCash + (prices.find(obj => obj.ticker === "SPY").price * 10));
    //}
    }

    function startSim(){
        if(simulation == false){
        console.log("Simulation started");
        dispatch(StartSimulation());
        }
        else {console.log("already running!!!")};
      }
    function endSim(){
        dispatch(EndSimulation());
    }
    function loopSim(){
        dispatch(toggleLoop());
    }

  return (
    
    <div className='flex flex-col m-auto w-[95%] h-[95%]'>
    <div className='flex flex-row justify-between w-[100%] text-white text-3xl font-extralight pb-2'>
      <div className='flex flex-row gap-6'>
        <div className='text-white text-3xl font-extralight'>Portfolio</div>
        <button onClick={handleViewChange} className='text-lg bg-deep-900 p-2 rounded-2xl font-extralight w-32'>
          {viewYTD ? "All-Time": "Short-Term"}
        </button>
      </div>
      <div className='text-green-500 text-3xl font-extralight'>${portfolio.toFixed(2)}</div>
    </div>
    <div className='h-[300px] w-[100%]'>
      <svg style={{height:0}}>
      <defs>
            <filter id="f1" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
            <linearGradient id="gradient-0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" />
                <stop offset="1" />
            </linearGradient>
            <linearGradient id="gradient-1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" />
                <stop offset="1" />
            </linearGradient>
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
      <PortfolioChart viewYTD={viewYTD}/>
    </div>
    <div className='flex flex-row justify-between items-center gap-8'>
      <div className='text-3xl text-white font-extralight py-6'>Stocks</div>
      <div className='flex flex-col justify-start items-center text-left'>
        <div className='text-deep-50 text-xl'>Buying Power</div>
        <div className='text-white text-xl'>${capital.toFixed(2)}</div>
      </div>
    </div>
    <div className='flex flex-row flex-wrap gap-6'>
      {renderStockBubbles()}
      <button 
        disabled={simulation}
        onClick={startSim} 
        className={`text-lg text-white p-3 px-4 bg-deep-900 rounded-2xl ${simulation ? 'text-zinc-500' : 'text-white'}`}>
          Start Simulation
      </button>
      <BuyButton buyStock={buyStock}/>
      <SellButton sellStock={sellStock}/> 
    </div>
    
  </div>
  )
}

export default Dashboard