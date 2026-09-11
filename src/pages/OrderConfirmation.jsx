import { Link, useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { guestReceipts } from '../data/receipts.js'
import { trackClick } from '../amplitude.js'

export default function OrderConfirmation() {
  const { orderNumber } = useParams()
  const { state } = useLocation()
  const { user, getOrders } = useAuth()
  const order = [...getOrders(), ...guestReceipts()].find(item => item.orderNumber === orderNumber)
    || (state?.order?.orderNumber === orderNumber ? state.order : null)

  if (!order) return (
    <div className="confirmation">
      <h1>Receipt unavailable</h1>
      <p>This demo receipt may be in another browser or account. Sign in to the account used for your purchase, or check your saved receipt link in the original browser.</p>
      <Link to={user ? '/account' : '/signin'} className="btn btn--tan">{user ? 'Order History' : 'Sign In'}</Link>
      <p><Link to="/store">Back to Store</Link></p>
    </div>
  )

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="confirmation">
          <div className="confirmation__icon" aria-hidden="true">🐾</div>
          <h1 style={{ color: 'var(--teal)' }}>Order Confirmed.</h1>
          <p>Dan has acknowledged your purchase from the couch. He did not get up, but his ears moved. That means a lot.</p>
          <p>Order number: <strong style={{ overflowWrap: 'anywhere' }}>{order.orderNumber}</strong></p>
          <section className="receipt-details" aria-labelledby="receipt-title">
            <h2 id="receipt-title">Your receipt</h2>
            <ul className="order-card__items">
              {order.items.map(item => <li key={item.id}><span>{item.name} × {item.qty}</span><span>${(item.price * item.qty).toFixed(2)}</span></li>)}
            </ul>
            <p>Subtotal: ${order.subtotal.toFixed(2)}<br />Shipping: ${order.shipping.toFixed(2)}<br /><strong>Total: ${order.total.toFixed(2)}</strong></p>
            {order.shippingInfo && <>
              <h3>Shipping to</h3>
              <p>{order.shippingInfo.name}<br />{order.shippingInfo.address}<br />{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</p>
              <p>{order.shippingInfo.shipping === 'express' ? 'Express shipping · 2–3 business days' : 'Standard shipping · 5–7 business days'}</p>
            </>}
          </section>
          <p>Bookmark this page to revisit your receipt. Demo receipts are saved in this browser only.</p>
          <section className="confirmation-story" aria-labelledby="confirmation-story-title">
            <h2 id="confirmation-story-title">From a Chicago shelter to Dan's couch.</h2>
            <p>Dan was adopted from the Anti-Cruelty Society of Chicago. Today, a portion of every sale supports the organization that gave him his start, helping more animals find a home.</p>
            <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--teal btn--sm" style={{ marginTop: '1rem' }}
              data-amplitude-explicit-click
              onClick={trackClick('Donate Link Clicked', { source_page: 'checkout', variant: 'confirmation' })}>
              Donate to Anti-Cruelty →
            </a>
          </section>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            {user && <Link to="/account" className="btn btn--tan">Order History</Link>}
            <Link to="/store" className="btn btn--outline-black">Keep Shopping →</Link>
            <Link to="/" className="btn btn--outline-black">Back Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
