// Header.js
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie' // Import Cookies library for removing cookies
import {CartContext} from '../CartContext'

const Header = ({history}) => {
  const {cartList} = useContext(CartContext)

  const getCartItemsCount = () =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)

  // Function to handle logout
  const onClickLogout = () => {
    Cookies.remove('jwt_token') // Remove the JWT token cookie
    history.replace('/login') // Redirect to the login page
  }

  return (
    <header className="p-4 d-flex flex-row align-items-center nav-header">
      <h1 className="m-0 logo-heading">
        <Link to="/">UNI Resto Cafe</Link>
      </h1>
      <div className="d-flex flex-row align-items-center ms-auto">
        <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
          My Orders
        </p>
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-container">
            <button data-testid="cart">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
            </button>
            {getCartItemsCount()}
            </div>
        </Link>
      </div>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
