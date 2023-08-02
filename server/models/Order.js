const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sureName: { type: String },
  phone: { type: String, required: true },
  description: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
