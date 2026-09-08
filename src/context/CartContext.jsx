import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import amplitude from '../amplitude.js'
import { product } from '../analytics/schema.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dan-dog-cart') || '[]') }
    catch { return [] }
  })

  const cartRef = useRef(cart)
  const commitCart = next => { cartRef.current = next; setCart(next) }

  useEffect(() => {
    localStorage.setItem('dan-dog-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, context = {}) => {
    {
      const prev = cartRef.current
      const existing = prev.find(i => i.id === product.id)
      const next = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]

      amplitude.track('Product Added to Cart', {
        products: [{ product_id: product.id, name: product.name, price: product.price, quantity: 1, type: 'merchandise', is_featured: !!context.is_featured }],
        cart_size_after: next.reduce((s, i) => s + i.qty, 0),
        cart_value_after: next.reduce((s, i) => s + i.price * i.qty, 0),
      })

      commitCart(next)
    }
  }, [])

  const removeFromCart = useCallback((id) => {
    {
      const prev = cartRef.current
      const removed = prev.find(i => i.id === id)
      const next = prev.filter(i => i.id !== id)

      if (removed) {
        amplitude.track('Product Removed from Cart', {
          products: [product(removed)],
          cart_size_after: next.reduce((s, i) => s + i.qty, 0),
        })
      }

      commitCart(next)
    }
  }, [])

  const updateQty = useCallback((id, delta) => {
    {
      const prev = cartRef.current
      const current = prev.find(i => i.id === id)
      if (!current) return
      const newQty = Math.max(1, current.qty + delta)
      if (newQty === current.qty) return

      amplitude.track('Cart Quantity Updated', {
        products: [product(current, 'merchandise', { old_quantity: current.qty, quantity: newQty, quantity_change: newQty - current.qty })],
      })

      commitCart(prev.map(i => i.id === id ? { ...i, qty: newQty } : i))
    }
  }, [])

  const clearCart = useCallback(() => commitCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
