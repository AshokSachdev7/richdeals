# INDEXNOW — 2026-11-11a

**Result: 2 pings, both HTTP 200. 25 deal slugs gave 28 URLs. A `--paths` ping covered 9 hub and post URLs.**

## Pings

| Mode | Input | URLs sent | HTTP |
|---|---|---|---|
| Slug | 25 deals, #16279–#16303 (the script adds the 3 hubs) | 28 | 200 |
| `--paths` | `/blog`, `/feed.xml`, `/llms.txt` and the 6 newest posts (this mode adds nothing) | 9 | 200 |

## Freshness

- sitemap.xml is ISR with a 1800s revalidate, so it carries the batch within 30 min. llms.txt is force-dynamic.
- No new static route was added, so `staticRoutes` needs no change.
