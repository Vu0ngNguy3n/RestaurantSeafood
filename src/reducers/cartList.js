const initState = [];

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newList = [...state];
      const newCartItem = {
        _id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        img: action.payload.img,
        total: 1,
        totalPrice: action.payload.price,
      };
      const findSeafood = newList.find((e) => e._id === action.payload._id);
      if (findSeafood !== undefined) {
        const index = newList.findIndex((e) => e._id === findSeafood._id);
        const newItem = {
          _id: findSeafood._id,
          name: findSeafood.name,
          price: findSeafood.price,
          img: findSeafood.img,
          total: findSeafood.total + 1,
          totalPrice: findSeafood.price * (findSeafood.total + 1),
        };
        newList.splice(index, 1, newItem);
      } else {
        newList.push(newCartItem);
      }

      return [...newList];
    }
    case "ADD_DETAILS": {
      const newList = [...state];
      const newItem = action.payload;
      const findIndex = newList.findIndex((item) => item._id === newItem._id);
      if (findIndex === -1) {
        newList.push(newItem);
      } else {
        const newTotal = newList[findIndex].total;
        const newCardItem = {
          _id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          img: newItem.img,
          total: +newItem.total + +newTotal,
          totalPrice: newItem.price * (+newItem.total + +newTotal),
        };
        newList.splice(findIndex, 1, newCardItem);
      }
      return [...newList];
    }
    case "INCREASE_ITEM": {
      const newList = [...state];
      const newCartItem = {
        _id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        img: action.payload.img,
        total: action.payload.total + 1,
        totalPrice: action.payload.price * (action.payload.total + 1),
      };
      const index = newList.findIndex(
        (item) => item._id === action.payload._id
      );
      newList.splice(index, 1, newCartItem);
      return [...newList];
    }
    case "DECREASE_ITEM": {
      const newList = [...state];
      if (action.payload.total === 0) {
        return [...state];
      } else {
        const newCartItem = {
          _id: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          img: action.payload.img,
          total: action.payload.total - 1,
          totalPrice: action.payload.price * (action.payload.total - 1),
        };
        const index = newList.findIndex(
          (item) => item._id === action.payload._id
        );
        newList.splice(index, 1, newCartItem);
        return [...newList];
      }
    }
    case "REMOVE_ITEM": {
      const newList = [...state];
      const index = newList.findIndex(
        (item) => item._id === action.payload._id
      );
      newList.splice(index, 1);
      return [...newList];
    }
    case "RESET_ITEM": {
      return [];
    }
    default:
      return state;
  }
};

export default cartReducer;
