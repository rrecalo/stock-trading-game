import React from 'react'
import { useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Turnstone from 'turnstone';
import { updateTradeSelection } from '../../../redux/tradeSelectionSlice';
import FocusedStock from './FocusedStock';

const Trade = () => {


  const portfolio = useSelector((state) => state.portfolio);
  const prices = useSelector((state) => state.prices);
  const tradeSelection = useSelector((state) => state.tradeSelection);
  const [listBoxData, setListBoxData] = useState();
  const dispatch = useDispatch();

  useEffect(()=>{ 
    if(listBoxData !== prices.map(e=>e.ticker))
      setListBoxData(prices.map(e=>e.ticker));
    
  },[prices])

  
  function handleTickerLookUp(event){
    if(event !== undefined && tradeSelection !== event){
      dispatch(updateTradeSelection(event));
    }
  }

  const listbox = {
    name: "Tickers",
    data: listBoxData,
    searchType: 'startsWith',
  }
  const styles = {
    input: 'w-full bg-deep-700 py-2 pl-2 text-lg text-deep-50 outline-none rounded-md',
    listbox: 'bg-deep-900 w-full text-slate-50 rounded-md',
    highlightedItem: 'bg-deep-700 py-1',
    query: 'text-white placeholder:text-deep-200',
    typeahead: 'text-deep-100',
    clearButton:'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-deep-300 hover:text-red-500',
    noItems: 'cursor-default text-center my-20',
    match: 'pl-4 font-semibold',
    groupHeading: 'px-5 py-3 text-pink-500',
    cancelButton: 'absolute my-auto h-full pl-2 text-deep-50',
  }
/* 
input,
// inputFocus,
// query,
// typeahead,
// cancelButton,
// clearButton,
// listbox,
// groupHeading,
// item,
highlightedItem
*/ 

  function calculateAllTimePercentChange(){
    let currentPrice = prices.find(e=>e.ticker===tradeSelection).price;
    let startPrice = prices.find(e=>e.ticker===tradeSelection).history.slice(2)[1];
    console.log(startPrice);
    if(startPrice === undefined || startPrice === 0){
      return (0).toFixed(2);
    }
    let changePercent = (((currentPrice - startPrice) / currentPrice) * 100).toFixed(2);
    if(changePercent > 0){
      return (<div className='text-3xl text-green-500'>{changePercent}%</div>)
    }
    else{
      return (<div className='text-3xl text-red-500'>{changePercent}%</div>)
    }
  }

  return (
    <div className='flex flex-col m-auto w-[95%] h-[95%]'>
        <div className='flex flex-row justify-between w-[100%] text-white text-3xl font-extralight pb-2'>
          <div className='flex flex-row justify-start gap-12'>
            <div className='text-white text-3xl font-extralight'>Trade</div>
            
          </div>
          <div className='text-green-500 text-3xl font-extralight'>${portfolio.value.toFixed(2)}</div>
          
        </div>
        <div className='w-[200px] pb-8 pt-2'>
            <Turnstone listbox={listbox}  text={tradeSelection}
            debounceWait={50}
            id="search"
            //listboxIsImmutable={true}
            matchText={true}
            autoFocus={true}
            name="search"
            styles={styles}
            noItemsMessage="We found no places that match your search"
            placeholder="Enter a stock Ticker"
            typeahead={true} onSelect={(e)=>handleTickerLookUp(e)}/>
            </div>
        <div className='flex flex-row justify-between'>
          <div className='w-[25%] flex flex-col justify-start'>
            <div className='flex flex-row justify-between w-[95%] gap-4'>
              <div className='text-3xl text-white'>{tradeSelection === "" ? "No Ticker Selected" : tradeSelection}</div>
              {tradeSelection !== "" ? 
              <>
              <div className='text-3xl text-white'>{(prices.find(e=>e.ticker===tradeSelection).price).toFixed(2)}</div>
              {calculateAllTimePercentChange()}
              </> : <></>} 
            </div>
            {tradeSelection !== "" ? 
              <>
                {/* <div className='text-xl text-white'>{((prices.find(e=>e.ticker===tradeSelection).price) - (prices.find(e=>e.ticker===tradeSelection).history.slice(-1))).toFixed(2)}</div> */}
             </> : <></>} 
          </div>
          <div className='w-[75%]'>
            <FocusedStock />
          </div>
        </div>
    </div>
  )
}


export default Trade