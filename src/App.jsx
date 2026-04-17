import { useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Things from './pages/Things'
import Store from './pages/Store'
import Business from './pages/Business'
import Checkout from './pages/Checkout'
import Gallery from './pages/Gallery'
import AntiCruelty from './pages/AntiCruelty'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import Account from './pages/Account'

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
          <Route path="/business"     element={<Business />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/anti-cruelty" element={<AntiCruelty />} />
          <Route path="/signin"        element={<SignIn />} />
          <Route path="/signup"        element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/account"       element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <HashRouter>
            <Layout />
          </HashRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}
