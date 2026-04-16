import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ImgSlot from './ImgSlot'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useCart()
  const navigate = useNavigate()

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goToCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="cart-drawer__header">
          <h3>Your Cart 🛍️</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="icon">🐾</div>
              <p>Dan&apos;s cart is empty.<br />He is judging you from the couch.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__img">
                  <ImgSlot
                    alt={item.name}
                    variant="img-slot--square"
                    style={{ height: '70px', borderRadius: '6px', fontSize: '0.6rem' }}
                  />
                </div>
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__price">${(item.price * item.qty).toFixed(2)}</div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id,  1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn--tan" style={{ width: '100%', justifyContent: 'center' }} onClick={goToCheckout}>
              Checkout →
            </button>
            <button
              className="btn btn--outline-black btn--sm"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
