const initState = [];

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newList = [...state];
      const newCartItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        img: action.payload.img,
        total: 1,
        totalPrice: action.payload.price,
      };
      const findSeafood = newList.find((e) => e.id === action.payload.id);
      if (findSeafood !== undefined) {
        const index = newList.findIndex((e) => e.id === findSeafood.id);
        const newItem = {
          id: findSeafood.id,
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
    case "INCREASE_ITEM": {
      const newList = [...state];
      const newCartItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        img: action.payload.img,
        total: action.payload.total + 1,
        totalPrice: action.payload.price * (action.payload.total + 1),
      };
      const index = newList.findIndex((item) => item.id === action.payload.id);
      newList.splice(index, 1, newCartItem);
      return [...newList];
    }
    case "DECREASE_ITEM": {
      const newList = [...state];
      if (action.payload.total === 0) {
        return [...state];
      } else {
        const newCartItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          img: action.payload.img,
          total: action.payload.total - 1,
          totalPrice: action.payload.price * (action.payload.total - 1),
        };
        const index = newList.findIndex(
          (item) => item.id === action.payload.id
        );
        newList.splice(index, 1, newCartItem);
        return [...newList];
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
