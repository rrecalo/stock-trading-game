const mongoose = require('mongoose')
const StockSchema = new mongoose.Schema({
    ticker : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    lastAvgPrice : {
        type: Number,
        required: true,
    },
    trend : {
        type: Number,
        required: true,
    },
});

const StockModel = mongoose.model("stocks", StockSchema);
module.exports = StockModel;