import React, { useState, useEffect } from 'react'
import { VictoryChart, VictoryTheme, VictoryLine} from 'victory'
import { useSelector } from 'react-redux'

const PortfolioChart = () => {

    const portfolio = useSelector((state) => state.portfolio);
    const [portfolioHistory, setPortfolioHistory] = useState([10000]);

    useEffect(()=>{
        if(portfolio > 0){
          if(portfolioHistory.length < 50){
            setPortfolioHistory(history=> [...history, portfolio]);
          }
          else{
            setPortfolioHistory(history=> [...history.slice(1), portfolio]);
          }
        }
      },[portfolio])


  return (
    <VictoryChart
            theme={VictoryTheme.grayscale}
          >
            <VictoryLine
              domain={{y:[portfolio * 0.98, portfolio * 1.02]}}
              style={{
                data: { stroke: "white" },
                parent: { border: "1px solid #ccc"}
              }}
              data={portfolioHistory}
            />
          </VictoryChart>
  )
}

export default PortfolioChart