import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const {REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));

// Auth0 Domain
    // dev-yyshkjggdlhptodt.us.auth0.com
// Auth0 Client ID
    // tIY0pYEo7pOnDzy7QNApgNq71FrqLdS7


root.render(
    <Auth0Provider
            domain={REACT_APP_AUTH0_DOMAIN}
            clientId={REACT_APP_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            cacheLocation='localstorage'
        >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
);
