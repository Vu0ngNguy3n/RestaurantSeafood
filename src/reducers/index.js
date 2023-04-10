const { combineReducers } = require("redux");
const { default: cartReducer } = require("./cartList");
const { default: accountReducer } = require("./account");

const rootReducer = combineReducers({
  cart: cartReducer,
  account: accountReducer,
});

export default rootReducer;
