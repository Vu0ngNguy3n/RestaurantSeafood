const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  hometown: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  typePay: {
    type: String,
  },
  cart: [
    {
      seafoodId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      img: {
        type: String,
      },
      total: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
    },
  ],
  totalCart: {
    type: Number,
  },
  delivered: {
    type: Boolean,
  },
  customer: {
    type: String,
  }
});

let Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
