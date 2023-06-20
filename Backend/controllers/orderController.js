const { Order } = require("../model/order");

const orderController = {
  addOrder: async (req, res) => {
    try {
      const orderContent = new Order(req.body);
      const saveOrder = await orderContent.save();
      res.status(200).json(saveOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOrderList: async (req, res) => {
    try {
      const orderList = await Order.find({});
      res.status(200).json(orderList);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const newOrder = await Order.findByIdAndDelete(req.params.slug);
      res.status(200).json("Delete successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOrderInfo: async (req, res) => {
    try {
      const orderInfo = await Order.findById(req.params.slug);
      res.status(200).json(orderInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateDelivered: async (req, res) => {
    try {
      const order = await Order.findById(req.body._id);
      const newOrder = new Order(req.body);
      await order.updateOne(newOrder);
      res.status(200).json("Update success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOrderListByUserId: async (req, res) => {
    try {
      const orderList = await Order.find({ customer: req.params.slug });
      res.status(200).json(orderList);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderController;
