import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import {CartContextProvider} from './CartContext'

const App = () => {
  return (
    <CartContextProvider>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </CartContextProvider>
  )
}

export default App
