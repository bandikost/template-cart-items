import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout.jsx'
import { store, persistor } from './store/store.js'
import CardAbout from './routes/CardAbout.jsx'
import Cart from './routes/Cart.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
        <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<App />} />
              <Route path="/card/:id" element={<CardAbout />} />
               <Route path="/cart" element={<Cart />} />
            </Route>
        </Routes>
    </PersistGate>     
  </Provider>
  </BrowserRouter>
)
