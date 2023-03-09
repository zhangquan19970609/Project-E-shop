import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max_price = Math.max(
      ...action.payload.map((product) => product.price)
    );
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price:max_price,
        price: max_price
      }
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true
    }
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort_by: action.payload
    }
  }
  if (action.type === SORT_PRODUCTS) {
    const {filtered_products, sort_by} = state;
    let tempProducts = [...filtered_products];
    if (sort_by === 'price-lowest'){
      tempProducts = filtered_products.sort((a,b) => a.price - b.price);
    }
    if (sort_by === 'price-highest'){
      tempProducts = filtered_products.sort((a,b) => b.price - a.price);
    }
    if (sort_by === 'name-a'){
      tempProducts = filtered_products.sort((a,b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort_by === 'name-z'){
      tempProducts = filtered_products.sort((a,b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {...state, filtered_products: tempProducts}
  }
  if (action.type === UPDATE_FILTERS) {
    const {name,value} = action.payload;
    return {
      ...state,
      filters:{
        ...state.filters,
        [name]: value
      }
    }
  }
  if (action.type === FILTER_PRODUCTS) {
    const {all_products, filters:{
      searchTerm,
      company,
      category,
      color,
      price,
      shipping,
    }} = state;
    
    let tempProducts = [...all_products];

    if (searchTerm) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(searchTerm);
      })
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => 
        product.category === category
      )
    }
    if(company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company
      })
    }

    if(color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true
      })
    }

    // if (price !== 0) {
    //   tempProducts = tempProducts.filter((product) => {
    //     return product.price <= price
    //   })
    // } else {
    //   tempProducts = tempProducts.filter((product) => product.price === 0)
    // }
      tempProducts = tempProducts.filter((product) => product.price <= price)

    return {...state, filtered_products: tempProducts}
  }
  if (action.type === CLEAR_FILTERS){
    return {
      ...state,
      filters:{
        searchTerm: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: state.filters.max_price,
        price: state.filters.max_price,
        shipping: false,
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
