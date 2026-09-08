export const money = value => Math.round((value + Number.EPSILON) * 100) / 100
export function product(item, type = 'merchandise', extra = {}) {
  return { product_id: item.id, name: item.name || item.title, type,
    ...(item.price !== undefined ? { price: item.price } : {}),
    quantity: item.qty ?? 1, ...extra }
}
export const products = (items, purchased = false) => items.map(item => product(item, 'merchandise',
  purchased ? { revenue: money(item.price * (item.qty ?? 1)) } : {}))
export function routePath(href) {
  const url = new URL(href)
  return url.hash.startsWith('#/') ? url.hash.slice(1).split('?')[0] : url.pathname
}
export function isMarkedBot(href) {
  const url = new URL(href)
  const hashQuery = url.hash.includes('?') ? url.hash.slice(url.hash.indexOf('?') + 1) : ''
  return url.searchParams.get('ampli_bot') === 'true' || new URLSearchParams(hashQuery).get('ampli_bot') === 'true'
}
export function sessionClassifier(storage) {
  const memory = new Map()
  return (sessionId, href) => {
    const key = `dan-analytics-session:${sessionId}`
    if (memory.has(key)) return memory.get(key)
    let saved
    try { saved = storage.getItem(key) } catch { /* Private browsing fallback. */ }
    const bot = saved === null || saved === undefined ? isMarkedBot(href) : saved === 'true'
    memory.set(key, bot)
    try { storage.setItem(key, String(bot)) } catch { /* Keep in memory. */ }
    return bot
  }
}
