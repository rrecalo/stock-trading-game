import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

const StockChart = ({data, ...props}) => {


      const options = {
        chart: {
            events: {
            load() {
                this.showLoading();
                setTimeout(this.hideLoading.bind(this), 1000);
            }
            },
          //type: "candlestick",
          height:250,
          width:250,
          //margin: [0, 0, 0, 0],
          styledMode: true,
          animation:{
            duration : 10
          }
        },
        noData:{},
        loading:{},
        legend:{enabled:false},
        title:{text:undefined},
        series: [
          {
            type: 'candlestick',
            data: data.slice(2), 
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
            title:{text:undefined},
            softMin: data.open * 0.95,
            softMax: data.open * 1.05,
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
        defs: {
            glow: {
                tagName: 'filter',
                id: 'glow',
                opacity: 0.5,
                children: [{
                    tagName: 'feGaussianBlur',
                    result: 'coloredBlur',
                    stdDeviation: 2.5
                }, {
                    tagName: 'feMerge',
                    children: [{
                        tagName: 'feMergeNode',
                        in: 'coloredBlur'
                    }, {
                        tagName: 'feMergeNode',
                        in: 'SourceGraphic'
                    }]
                }]
            }
        },
        credits:{enabled:false}
        
      };

  return (
    
        <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default StockChart
