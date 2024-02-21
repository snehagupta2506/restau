// CartContext.js
import React, { useState } from 'react';

const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const addCartItem = product => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id
    );

    if (productObject) {
      setCartList(prevCartList => {
        const updatedCartList = prevCartList.map(eachCartItem => {
          if (eachCartItem.id === product.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        });
        return updatedCartList;
      });
    } else {
      setCartList(prevCartList => [...prevCartList, product]);
    }
  };

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList => {
      const updatedCartList = prevCartList.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCartList;
    });
  };

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList => {
      const updatedCartList = prevCartList.map(item => {
        if (item.id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedCartList;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };

