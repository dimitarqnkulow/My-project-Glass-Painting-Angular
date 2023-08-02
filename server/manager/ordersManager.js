const Order = require("../models/Order");

exports.order = (orderData) => {
  Order.create(orderData);
};
