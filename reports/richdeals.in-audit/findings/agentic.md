# Agentic readiness: richdeals.in (2026-10-28)
Score: 86/100 (Agent-UX heuristic 100 on all 5 pages, complete; Lighthouse fraction unavailable: PSI 429 quota both strategies, no API key).
Access policy: training = allowed (GPTBot, CCBot, Google-Extended, Applebot-Extended named Allow /); search = allowed (OAI-SearchBot, PerplexityBot); user-triggered = allowed (ChatGPT-User, Claude-User via *, Perplexity-User) but Disallow /api/ and /search apply to all groups.
Pass: SSR 2013 words without JS; 404s real; llms.txt (16.7KB) + llms-full.txt 200, Lighthouse rules pass; agent UAs (ClaudeBot, GPTBot) get 200 (no WAF block; --ua-matrix not run).
Findings
- P1 | Get Deal CTA lives under robots-disallowed /api/ | CTA href https://richdeals.in/api/out/3728 (302); robots.txt every group has Disallow: /api/ | apps/web/src/app/robots.ts | add Allow: /api/out/ per group (longest match wins) or serve /out/:id at a non-/api path; otherwise robots-honouring user agents (Claude-User) cannot follow the buy link.
- P2 | /search disallowed yet is the only site form | Disallow: /search; form role=search action=/search | robots.ts | keep for crawl budget, but accept agents cannot use it; alternative is Allow for user-triggered UAs (Claude-User, ChatGPT-User) only.
- P3 | No Content-Signal line (draft) | no lines in robots.txt | robots.ts | optional: Content-Signal: search=yes, ai-input=yes, ai-train=<choice> (draft, checked 2026-09-23).
- P3 | No Markdown delivery | Accept: text/markdown returns text/html; /index.md 404 | opportunity, none | skip; llms.txt already covers it.
- P3 | WebMCP absent, search form unannotated | registerTool 0; 1 form | opportunity (W3C CG draft) | optional toolname/tooldescription on /search form; low value.
- P3 | ai-catalog.json / agent-card / api-catalog / oauth well-known all 404 | n/a: no matching service | none | no action (drafts/proposals).
Notes: input without aria flagged as 1 per page (heuristic info only; 0 unlabelled, 0 unnamed interactive in a11y tree). CTA is a real <a> with text "Get Deal"/"Grab Deal" and aria-label on cards, rel="sponsored nofollow noopener". Standards status per vendor-matrix checked 2026-09-23.
Re-run lighthouse_agentic.py after configuring a Google API key to obtain X/N.
