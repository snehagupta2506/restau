import React, {useContext, useState} from 'react'
import Header from '../Header'
import {CartContext} from '../CartContext'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const [quantityMap, setQuantityMap] = useState(
    cartList.reduce((acc, item) => {
      acc[item.dishId] = item.quantity
      return acc
    }, {}),
  )

  const handleIncrementQuantity = id => {
    incrementCartItemQuantity(id)
    setQuantityMap(prevState => ({
      ...prevState,
      [id]: prevState[id] + 1,
    }))
  }

  const handleDecrementQuantity = id => {
    decrementCartItemQuantity(id)
    setQuantityMap(prevState => ({
      ...prevState,
      [id]: prevState[id] - 1,
    }))
  }

  return (
    <div className="cart-page">
      {cartList.length === 0 ? (
        <div className="empty-cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="Empty Cart"
          />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="cart-items-container">
          <Header />
          <h2>Your Cart</h2>
          {cartList.map(item => (
            <div key={item.dishId} className="cart-item">
              <img src={item.dishImage} alt={item.dishName} />
              <div className="cart-item-details">
                <p>{item.dishName}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    data-testid="button"
                    onClick={() => handleDecrementQuantity(item.dishId)}
                  >
                    -
                  </button>
                  <p>{quantityMap[item.dishId]}</p>
                  <button
                    className="quantity-button"
                    data-testid="button"
                    onClick={() => handleIncrementQuantity(item.dishId)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="remove-all-button" onClick={removeAllCartItems}>
            Remove All
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
