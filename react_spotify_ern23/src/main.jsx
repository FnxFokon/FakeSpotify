import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { RouterProvider } from 'react-router-dom'
import Router from './tools/Router'
import { AuthContextProvider } from './tools/AuthContext'
import AppRoot from './tools/AppRoot'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppRoot />
    </AuthContextProvider>
  </React.StrictMode>,
)
