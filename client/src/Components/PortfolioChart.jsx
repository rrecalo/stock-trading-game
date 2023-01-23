import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PortfolioChart = () => {

    const portfolio = useSelector((state) => state.portfolio);
    const [portfolioHistory, setPortfolioHistory] = useState([10000]);

    useEffect(()=>{
        if(portfolio > 0){
          if(portfolioHistory.length < 50){
            setPortfolioHistory(history=> [...history, (Math.round(portfolio * 100) / 100)]);
          }
          else{
            setPortfolioHistory(history=> [...history.slice(1), (Math.round(portfolio * 100) / 100)]);
          }
        }
      },[portfolio])

      const options = {
        chart: {
          type: 'spline',
          height:100,
          width:100,
          margin: [0, 0, 0, 0],
          styledMode: true,
          animation:{
            duration : 200
          }
        },
        legend:{enabled:false},
        title:{text:undefined},
        series: [
          {
            data: portfolioHistory, 
            marker: {
                enabled: false,
                states:{
                    hover:{enabled:false}
                }
             },
          }
        ],
        tooltip: { enabled: false },
        yAxis:{
            softMin: portfolio * 0.98,
            softMax: portfolio * 1.02,
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false,
                    states:{
                        hover:{enabled:false}
                    }
                }
            },
        },
        credits:{enabled:false}
        
      };

  return (
    
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default PortfolioChart

