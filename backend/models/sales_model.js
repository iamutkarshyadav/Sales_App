const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const addSales = new Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("sales", addSales);
