import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {UserProvider} from './context/AuthContext.jsx'
import { ShopWrapper } from './context/shopContext/ProductsContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <UserProvider>
      <ShopWrapper>
      <App />
      </ShopWrapper>
    </UserProvider>     
  </React.StrictMode>,
)
