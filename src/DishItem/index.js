import React, {useState, useContext} from 'react'
import './index.css'
import {CartContext} from '../CartContext'

const DishItem = ({dishDetails}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const {cartList, addCartItem} = useContext(CartContext)

  const cartItem = cartList.find(item => item.dishId === dishId)

  const [productQuantity, setProductQuantity] = useState(0) // Initialize product quantity as 0

  const handleAddToCart = () => {
    if (productQuantity > 0) {
      if (cartItem) {
        // If the dish is already in the cart, update its quantity by one
        const updatedQuantity = cartItem.quantity + 1
        addCartItem({...dishDetails, quantity: updatedQuantity})
      } else {
        // If the dish is not in the cart, add it with quantity one
        addCartItem({...dishDetails, quantity: 1})
      }
      // Increment cart quantity by one after adding to cart
      // Here you should call a function to update the cart quantity in your CartContext
    }
    // Reset product quantity after adding to cart
    setProductQuantity(0)
  }

  const handleIncrementProductQuantity = () => {
    setProductQuantity(prevQuantity => prevQuantity + 1) // Increment product quantity
  }

  const handleDecrementProductQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(prevQuantity => prevQuantity - 1) // Decrement product quantity, but prevent it from going below 0
    }
  }

  return (
    <li className="mb-3 p-3 dish-item-container d-flex">
      <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} me-3`}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && (
          <div className="controller-container d-flex align-items-center bg-success">
            <button
              className="button"
              type="button"
              data-testid="button"
              onClick={handleDecrementProductQuantity}
            >
              -
            </button>
            <p className="quantity">{productQuantity}</p>
            <button
              className="button"
              type="button"
              data-testid="button"
              onClick={handleIncrementProductQuantity}
            >
              +
            </button>
          </div>
        )}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {dishAvailability &&
          productQuantity > 0 && ( // Show Add to Cart button only when product quantity is more than 0
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          )}
        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-calories text-warning">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
