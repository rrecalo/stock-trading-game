import React from 'react'
import { useSelector} from 'react-redux'

const Positions = () => {

  const portfolio = useSelector((state) => state.portfolio);
  const positions = useSelector((state) => state.positions);
  const prices = useSelector((state) => state.prices);

  const renderPositionsTable = ()=>{
    return positions.map((stock) =>
      (<tr>
        <td>{stock.ticker}</td>
        <td>{prices.find(s=>s.ticker === stock.ticker).price.toFixed(2)}</td>
        <td>{stock.amount}</td>
      </tr>)
    )
  }

  return (
    <div className='flex flex-col m-auto w-[95%] h-[95%]'>
        <div className='flex flex-row justify-between w-[100%] text-white text-3xl font-extralight pb-2'>
          <div className='text-white text-3xl font-extralight'>Positions</div>
          <div className='text-green-500 text-3xl font-extralight'>${portfolio.toFixed(2)}</div>
        </div>
        <div className='h-[500px] w-[100%]'>
        <table className='text-white'>
            <tr className='text-deep-50'>
              <th>Ticker</th>
              <th>Last</th>
              <th>Quantity</th>
            </tr>
            {renderPositionsTable()}
          </table>
        </div>
    </div>
  )
}

export default Positions