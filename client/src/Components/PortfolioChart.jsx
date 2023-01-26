import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PortfolioChart = ({viewYTD, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    

      const options = {
        chart: {
          type: 'area',
          height:300,
          styledMode: true,
          animation:{
            duration : 0
          },
          marginBottom:5,
          marginTop:0,
          marginLeft: 0,
          spacing:[0, 0, 0, 0],
          //spacing:[0, 0, 0, 0],
        },
        legend:{enabled:false},
        title:{text:undefined},
        //title:{text:"Portfolio", align:"left", x:0},
        series: [
          {
            data: viewYTD ? portfolio.history : portfolio.history.slice(-250), 
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
            labels:{x:5, y:-5, align:"left",
          },
            ceiling:viewYTD ? Math.max(...portfolio.history) * 1.01 : Math.max(...portfolio.history.slice(-250)) * 1.01,
            floor:viewYTD ? Math.min(...portfolio.history) * 0.99 : Math.min(...portfolio.history.slice(-250)) * 0.99,
            //softMin: portfolio * 0.95,
            //softMax: portfolio * 1.05,
            title:{text:undefined},
            //minPadding:25,
            maxPadding:0.05,
        },
        xAxis:{labels:{enabled:false}, tickLength:0,
        minPadding:0.0, maxPadding:0.0},
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
    <div id="portfolio_chart" className=''>
    <HighchartsReact  highcharts={Highcharts} options={options} />
    </div>
  )
}

export default PortfolioChart

