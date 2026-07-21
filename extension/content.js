// RichDeals Telegram Grabber — content script.
// Watches the deal group's message list for NEW messages and forwards deal
// posts (text + store links) to the background worker, which pushes them to
// the RichDeals API in real time. Only runs on the configured group.

const GROUP_HASH = "-1001146824230"; // only this group
const LINK_RE = /amazn|amzn|amazon\.in|myntr|myntra|ajiio|ajio|fkrt|flipkart|nykaa|tatacliq|linksredirect|linkredirect|cuelinks|bit\.ly|dl\.flipkart|spoo\.me|wishlink|earnkaro|inr\.deals/i;
const AD_RE = /trading|\bnifty\b|bank ?nifty|stock market|market analysis|view channel|what'?s this|join (channel|now)|t\.me\/|learning content|chart analysis/i;

const seen = new Set();

function inTargetGroup() {
  return location.hash.includes(GROUP_HASH);
}

function extract(el) {
  const text = (el.innerText || "").trim();
  if (!text || text.length < 8 || AD_RE.test(text)) return null;
  const links = [...el.querySelectorAll("a")].map((a) => a.href).filter((h) => h && LINK_RE.test(h));
  if (!links.length) return null;
  const key = text.slice(0, 70);
  if (seen.has(key)) return null;
  seen.add(key);
  return { text: text.slice(0, 400), links };
}

function scanAll() {
  if (!inTargetGroup()) return;
  const batch = [];
  document.querySelectorAll(".text-content, [class*='text-content']").forEach((el) => {
    const m = extract(el);
    if (m) batch.push(m);
  });
  if (batch.length) chrome.runtime.sendMessage({ type: "deals", messages: batch });
}

// Observe the message list for newly-added bubbles → instant capture.
const observer = new MutationObserver((muts) => {
  if (!inTargetGroup()) return;
  const batch = [];
  for (const mut of muts) {
    mut.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      node.querySelectorAll?.(".text-content, [class*='text-content']").forEach((el) => {
        const m = extract(el);
        if (m) batch.push(m);
      });
      if (node.matches?.(".text-content")) {
        const m = extract(node);
        if (m) batch.push(m);
      }
    });
  }
  if (batch.length) chrome.runtime.sendMessage({ type: "deals", messages: batch });
});

observer.observe(document.body, { childList: true, subtree: true });
// initial sweep of whatever is already loaded
setTimeout(scanAll, 3000);
console.log("[RichDeals] Telegram grabber active on group", GROUP_HASH);
