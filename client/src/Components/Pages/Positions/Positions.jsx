import React from 'react'
import { useSelector} from 'react-redux'
import PortfolioChart from '../../PortfolioChart'

const Positions = () => {

  const portfolio = useSelector((state) => state.portfolio);
  const positions = useSelector((state) => state.positions);
  const prices = useSelector((state) => state.prices);

  const renderPositionsTable = ()=>{
    
    return positions.map((stock) => {
      if(stock.amount > 0){
        return (<tr className='text-center font-light text-xl'>
        <td className='font-medium p-2 border-r border-deep-300'>{stock.ticker}</td>
        <td className='bg-deep-700'>{prices.find(s=>s.ticker === stock.ticker).price.toFixed(2)}</td>
        <td>{stock.amount}</td>
        <td className={` bg-deep-700 ${prices.find(s=>s.ticker === stock.ticker).price < stock.cost ? 'text-red-500' : 'text-green-500'}`}>
        {((prices.find(s=>s.ticker === stock.ticker).price - stock.cost) * stock.amount).toFixed(2)}</td>
        <td className={`${prices.find(s=>s.ticker === stock.ticker).price < stock.cost ? 'text-red-500' : 'text-green-500'}`}>
        {(((prices.find(s=>s.ticker === stock.ticker).price - stock.cost) * stock.amount).toFixed(2) / (stock.amount * prices.find(s=>s.ticker === stock.ticker).price)*100).toFixed(2)}%</td>
        <td>{stock.cost.toFixed(2)}</td>
        <td className='bg-deep-700'>{prices.find(s=>s.ticker === stock.ticker).last.toFixed(2)}</td>
      </tr>)
      };
    }
    )
  }

  return (
    <div className='flex flex-col m-auto w-[95%] h-[95%]'>
        <div className='flex flex-row justify-between w-[100%] text-white text-3xl font-extralight pb-2'>
          <div className='text-white text-3xl font-extralight'>Positions</div>
          <div className='text-green-500 text-3xl font-extralight'>${portfolio.value.toFixed(2)}</div>
        </div>
        
        <div className='h-[500px] w-[100%]'>
        <table className='text-white w-[100%]'>
            <tr className='text-deep-50'>
              <th className='w-24 p-2 border-deep-200 border-b'>Ticker</th>
              <th className='w-32 text-center border-deep-200 border-b bg-deep-700'>Last Ask</th>
              <th className='w-32 border-deep-200 border-b'>Quantity</th>
              <th className='w-32 border-deep-200 border-b bg-deep-700'>P/L $</th>
              <th className='w-32 border-deep-200 border-b'>P/L %</th>
              <th className='w-32 border-deep-200 border-b text-center'>$ Cost / Share</th>

              <th className='w-32 border-deep-200 border-b bg-deep-700'>Last Close</th>

            </tr>
            <tbody>
            {renderPositionsTable()}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Positions

/**
 * <div className='h-[200px] w-[50%] mb-[25px]'>
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
          <PortfolioChart height={200}/>
        </div>
 */