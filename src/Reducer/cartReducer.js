const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;
    // console.log("PRODUCT", product);

    //to tackle the existing item in the cart page

    let existingProduct = state.cart.find(
      (currItem) => currItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((currItem) => {
        if (currItem.id === id + color) {
          let newAmount = currItem.amount + amount;

          if (newAmount >= currItem.max) {
            newAmount = currItem.max;
          }

          return {
            ...currItem,
            amount: newAmount,
          };
        } else {
          return currItem;
        }
      });

      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }
  // to set the increment decrement in cart page

  // to set the decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((currele) => {
      if (currele.id === action.payload) {
        let decAmount = currele.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...currele,
          amount: decAmount,
        };
      } else {
        return currele;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }

  // to set the increment
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((currele) => {
      if (currele.id === action.payload) {
        let decAmount = currele.amount + 1;

        if (decAmount >= currele.max) {
          decAmount = currele.max;
        }
        return {
          ...currele,
          amount: decAmount,
        };
      } else {
        return currele;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (currItem) => currItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  // to get the total item in the cart logo

  if (action.type === "CART_TOTAL_ITEM") {
    let updateditem = state.cart.reduce((initialVal, curEle) => {
      let { amount } = curEle;
      initialVal = initialVal + amount;

      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updateditem,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let totalprice = state.cart.reduce((initialVal, currele) => {
      let { price, amount } = currele;

      initialVal = initialVal + price * amount;

      return initialVal;
    }, 0);
    return {
      ...state,
      total_price: totalprice,
    };
  }

  return state;
};

export default cartReducer;
