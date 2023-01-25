/*
* Takes in an object 'stock'
stock : {trend: number, price: number}
*/
export default function stockMove(stock){

    //DECENT VALUES
    //15
    //25 or 50
    //2

    //raised from 20
    var TREND_STRENGTH_COEFFICIENT = 30; //higher = stronger/longer trends
    //250
    var PERCENT_CHANGE_COEFFICIENT = 100; // higher == smaller moves 50 works well
    //dropped from two
    var TREND_PRICE_EFFECT_COEFFCIENT = 1.75; //higher == stronger price moves relative to trend value
    
    

    
    function calc(baseValue){
      //default basevalue == 0.01
      return baseValue * (Math.random() / (PERCENT_CHANGE_COEFFICIENT / (Math.abs(stock.trend) * TREND_PRICE_EFFECT_COEFFCIENT)));
    }

    if(stock.trend <= -2){
      let chance = Math.random();
      if(chance > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
        stock.trend +=1;
        stock.price = stock.price * (1 + calc(0.01));
      }
      else if(chance <= 0.05){
        stock.trend+=10;
        stock.price = stock.price * (1 + calc(0.015));
      }
      else{
        stock.trend -=1;
        stock.price = stock.price * (1 - calc(0.005));
      }
    }
    else if(stock.trend >= 2){
      let chance = Math.random();
      if(chance > (1 / Math.abs(stock.trend / TREND_STRENGTH_COEFFICIENT))){
        stock.trend -=1;
        stock.price = stock.price * (1 - calc(0.01));
      }
      else if(chance <= 0.05){
        stock.trend-=10;
        stock.price = stock.price * (1 - calc(0.015));
      }
      else{
        stock.trend +=1;
        stock.price = stock.price * (1 + calc(0.005));
      }
    }
    else {
      let chance = Math.random();
      if(chance > 0.9){
        stock.trend+=3;
        stock.price = stock.price * (1 +(0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT))));
      }
      else if(chance > 0.5){
        stock.trend +=1;
        stock.price = stock.price * (1 + (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
      }
      else if(chance < 0.1){
        stock.trend -=3;
        stock.price = stock.price * (1 - (0.01 * (Math.random() / (PERCENT_CHANGE_COEFFICIENT))));
      }
      else{
        stock.trend -=1;
        stock.price = stock.price * (1 - (0.01 * (Math.random() / PERCENT_CHANGE_COEFFICIENT)));
      }
    }
    
    return({ticker: stock.ticker, price : stock.price, trend : stock.trend});

  }