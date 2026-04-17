import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import amplitude from '../amplitude.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dan-dog-cart') || '[]') }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('dan-dog-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, context = {}) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      const next = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]

      amplitude.track('Product Added to Cart', {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        is_featured: !!context.is_featured,
        cart_size_after: next.reduce((s, i) => s + i.qty, 0),
        cart_value_after: next.reduce((s, i) => s + i.price * i.qty, 0),
      })

      return next
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const removed = prev.find(i => i.id === id)
      const next = prev.filter(i => i.id !== id)

      if (removed) {
        amplitude.track('Product Removed from Cart', {
          product_id: removed.id,
          product_name: removed.name,
          cart_size_after: next.reduce((s, i) => s + i.qty, 0),
        })
      }

      return next
    })
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart(prev => {
      const current = prev.find(i => i.id === id)
      if (!current) return prev
      const newQty = Math.max(1, current.qty + delta)
      if (newQty === current.qty) return prev

      amplitude.track('Cart Quantity Updated', {
        product_id: current.id,
        product_name: current.name,
        old_qty: current.qty,
        new_qty: newQty,
        direction: delta > 0 ? 'increase' : 'decrease',
      })

      return prev.map(i => i.id === id ? { ...i, qty: newQty } : i)
    })
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
