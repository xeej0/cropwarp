// xeej login gate. Copy this file to the root of any Vercel app on xeej.app to
// require the hub password: unlocking hub.xeej.app unlocks every gated app.
// Needs the project's env vars HUB_PASSWORD and HUB_SECRET (same values as the
// hub project). No dependencies; runs as Vercel Routing Middleware.
export const config = { matcher: '/:path*' }

const HOST = 'cropwarp.xeej.app' // this app's address
const HUB = 'https://hub.xeej.app'
const enc = new TextEncoder()

async function expected() {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.HUB_SECRET || 'unset'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode('hub:' + (process.env.HUB_PASSWORD || ''))))
  return btoa(String.fromCharCode(...sig)).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c])
}

export default async function middleware(req) {
  const url = new URL(req.url)
  // The login cookie only exists on xeej.app, so send other addresses (like the
  // *.vercel.app one) to the real one first.
  if (url.hostname !== HOST) return Response.redirect('https://' + HOST + url.pathname + url.search, 308)
  const m = (req.headers.get('cookie') || '').match(/(?:^|;\s*)hub_auth=([^;]+)/)
  if (process.env.HUB_PASSWORD && m && m[1] === (await expected())) return new Response(null, { headers: { 'x-middleware-next': '1' } })
  return Response.redirect(HUB + '/?next=' + encodeURIComponent(url.href), 302)
}
