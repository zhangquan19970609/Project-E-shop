import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {AboutPage, AuthWrapper, CartPage, CheckoutPage, ErrorPage, HomePage, PrivateRoute, ProductsPage, SingleProductPage} from './pages'
import { Navbar, Sidebar, Footer } from './components'


function App() {
  return (
    <div>
      <AuthWrapper>
      <Router>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Switch>
          <Route exact={true} path='/'>
            <HomePage></HomePage>
          </Route>

          <Route path='/about'>
            <AboutPage></AboutPage>
          </Route>
          
          <Route exact path='/products'>
            <ProductsPage></ProductsPage>
          </Route>
          
          <Route path='/products/:id' children={<SingleProductPage/>}></Route>
          <Route path='/cart'>
            <CartPage></CartPage>
          </Route>
          
          <PrivateRoute exact={true} path='/checkout'>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
          
          <Route path='*'>
            <ErrorPage></ErrorPage>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
      </AuthWrapper>
    </div>
  )
}

export default App
