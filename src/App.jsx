import { useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Things from './pages/Things'
import Store from './pages/Store'
import Checkout from './pages/Checkout'
import Gallery from './pages/Gallery'
import AntiCruelty from './pages/AntiCruelty'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <ScrollToTop />
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <main>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/things"       element={<Things />} />
          <Route path="/store"        element={<Store />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/anti-cruelty" element={<AntiCruelty />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <HashRouter>
          <Layout />
        </HashRouter>
      </ToastProvider>
    </CartProvider>
  )
}
