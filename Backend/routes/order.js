const orderController = require("../controllers/orderController");

const router = require("express").Router();

router.post("/addOrder", orderController.addOrder);
router.get("/getOrderList", orderController.getOrderList);
router.delete("/deleteOrder/:slug", orderController.deleteOrder);
router.get("/getOrderInfo/:slug", orderController.getOrderInfo);
router.post("/updateDelivered", orderController.updateDelivered);
router.get("/getOrderListByUserId/:slug", orderController.getOrderListByUserId);

module.exports = router;
