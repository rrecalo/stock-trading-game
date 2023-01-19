const mongoose = require('mongoose')
const StockSchema = new mongoose.Schema({
    ticker : {
        type: String,
        required: true,
    },
    price : {
        type: Double,
        required: true,
    },
    lastAvgPrice : {
        type: Double,
        required: true,
    },
    trend : {
        type: Int32,
        required: true,
    },
});

const StockModel = mongoose.model("stocks", UserSchema);
module.exports = StockModel;