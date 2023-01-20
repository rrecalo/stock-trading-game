import React, {useContext, useState} from 'react'

const PriceContext = React.createContext();
const PriceUpdateContext = React.createContext();

export function usePrice(){
    return useContext(PriceContext);
}

export function usePriceUpdate(){
    return useContext(PriceUpdateContext);
}

const PriceProvider = ({children, values}) => {

    const [prices, setPrices] = useState(values);

    function updatePrices(newPrices){
        setPrices(newPrices);
    }

  return (
    <PriceContext.Provider value={prices}>
        <PriceUpdateContext.Provider value={updatePrices}>
            {children}
        </PriceUpdateContext.Provider>
    </PriceContext.Provider>
  )
}

export default PriceProvider