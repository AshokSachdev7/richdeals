// RichDeals Telegram Grabber — background worker.
// Receives deal messages from the content script and POSTs them to the
// RichDeals API (host_permissions bypasses CORS). The API resolves shortlinks,
// swaps affiliate tags, fetches images, dedups, and publishes.

const API = "http://localhost:4000/admin/ingest/telegram";
const ADMIN_KEY = "dev-admin-key-change-me"; // change to match API .env ADMIN_KEY

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type !== "deals" || !msg.messages?.length) return;
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify({ messages: msg.messages }),
  })
    .then((r) => r.json())
    .then((r) => console.log(`[RichDeals] pushed ${r.created}/${r.received} deals`))
    .catch((e) => console.warn("[RichDeals] push failed", e.message));
});
