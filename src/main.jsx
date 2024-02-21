import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Browse from './components/Browse.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>

  },
  {
    path:"/browse",
    element:<Browse/>
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </RouterProvider>
  
)
