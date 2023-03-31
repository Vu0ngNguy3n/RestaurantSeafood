const { combineReducers } = require("redux");
const { default: cartReducer } = require("./cartList");


const rootReducer = combineReducers({
    cart: cartReducer
})

export default rootReducer