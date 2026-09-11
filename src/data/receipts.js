const KEY = 'dan-dog-guest-receipts'
let fallback = []

export function guestReceipts() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch { return fallback }
}

export function saveGuestReceipt(order) {
  fallback = [order, ...guestReceipts().filter(item => item.orderNumber !== order.orderNumber)]
  try { localStorage.setItem(KEY, JSON.stringify(fallback)) } catch { /* Receipt remains available this session. */ }
}
