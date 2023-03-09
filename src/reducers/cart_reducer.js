// import { FaAddressBook } from 'react-icons/fa'
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload;
    const tempItemExist = state.cart.find((item) => item.id === id + color);

    if(tempItemExist) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          if (item.amount + amount > item.max){
            return {...item, amount: item.max}
          } else {
            return {...item, amount: item.amount + amount}
          }
        } else {
          return item
        }
      })
      return {...state, cart: tempCart}

    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return {...state, cart:[...state.cart, newItem]}
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload)
    return {...state, cart:tempCart}
  }

  if(action.type === CLEAR_CART){
    return {...state, cart:[]}
  }

  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    let tempCart = state.cart.map((item) => {
      if (action.payload.id === item.id) {
        if (action.payload.type === '+'){
          if (item.amount < item.max){
            return {...item, amount: item.amount + 1}
          } else {
            return {...item}
          }
        } else {
          if (item.amount > 1) {
            return {...item, amount: item.amount -1}
          } else {
            return {...item}
          }
        }
      } else{
        return item
      }
    })
    return {...state, cart: tempCart}
  }

  if (action.type === COUNT_CART_TOTALS) {
    // let tempTotal = 0;
    // let tempItems = 0;
    // state.cart.map((item) => {
    //   tempTotal = tempTotal + item.price * item.amount;
    //   tempItems = tempItems + item.amount;
    // })

    // return {...state, total_amount: tempTotal, total_items:tempItems}
    if (action.type === COUNT_CART_TOTALS) {
        const {total_amount, total_items} = state.cart.reduce((total, item) => {
            const {amount, price} = item;
            total.total_items += amount;
            total.total_amount += amount * price;
            return total
        },{
          total_amount: 0,
          total_items: 0
        })
        return {...state, 
          total_amount: total_amount, 
          total_items:total_items
        }
      }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
