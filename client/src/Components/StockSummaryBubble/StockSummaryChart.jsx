import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import StockSummaryChartStyles from './StockSummaryChartStyles.css';

const StockSummaryChart = ({data, ...props}) => {

    const [priceData, setPriceData] = useState(data.map(e => e));

    useEffect(() => {
        if(data.slice(-1) !== priceData){
        setPriceData(data.map(e => e));
        }
    },[data]);


      const options = {
        chart: {
          type: 'area',
          height:'80',
          width:'100',
          styledMode: false,
          animation:{
            duration : 50
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
            data: priceData,//[data.map(e=> {return e.close})];
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
            labels:{enabled: false},
            ceiling: Math.max(...priceData) * 1.01,
            floor: Math.min(...priceData) * 0.99,
            //softMin: portfolio * 0.95,
            //softMax: portfolio * 1.05,
            title:{text:undefined},
            //minPadding:25,
            maxPadding:0.05,
        },
        xAxis:{
            style:{color:"transparent"},
            labels:{enabled:false}, tickLength:0,
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
    <div id="stock_summary_chart">
    
    <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default StockSummaryChart

