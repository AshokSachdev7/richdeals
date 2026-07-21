import { Injectable, Logger } from '@nestjs/common';

// Tells the Next.js site to refresh specific ISR pages — no rebuild, no downtime.
@Injectable()
export class RevalidateService {
  private readonly log = new Logger('Revalidate');

  private base() {
    return process.env.WEB_URL ?? 'http://localhost:3000';
  }
  private secret() {
    return process.env.REVALIDATE_SECRET ?? '';
  }

  // Fire-and-forget: a failed revalidation must never break the API write.
  async revalidate(paths: string[]): Promise<void> {
    const unique = [...new Set(paths.filter(Boolean))];
    await Promise.all(
      unique.map(async (p) => {
        try {
          const url = `${this.base()}/api/revalidate?secret=${encodeURIComponent(this.secret())}&path=${encodeURIComponent(p)}`;
          const res = await fetch(url, { method: 'POST' });
          if (!res.ok) this.log.warn(`revalidate ${p} -> ${res.status}`);
        } catch (e) {
          this.log.warn(`revalidate ${p} failed: ${(e as Error).message}`);
        }
      }),
    );
    // Ping IndexNow (Bing/Yandex/etc) with the changed public URLs — instant discovery.
    await this.submitIndexNow(unique);
  }

  // IndexNow: notifies search engines of new/changed URLs. Prod-only (needs the
  // key file served at https://<host>/<key>.txt). No-op locally or without a key.
  async submitIndexNow(paths: string[]): Promise<void> {
    const key = process.env.INDEXNOW_KEY ?? '';
    const base = this.base();
    if (!key || !base.startsWith('https://')) return;
    const host = new URL(base).host;
    const urlList = [...new Set(paths.filter(Boolean))]
      .filter((p) => p.startsWith('/') && !p.startsWith('/api'))
      .map((p) => `${base}${p}`);
    if (!urlList.length) return;
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ host, key, keyLocation: `${base}/${key}.txt`, urlList }),
      });
      if (!res.ok) this.log.warn(`indexnow -> ${res.status}`);
    } catch (e) {
      this.log.warn(`indexnow failed: ${(e as Error).message}`);
    }
  }

  // Standard set of pages affected when a deal changes.
  pathsForDeal(slug: string, storeSlug?: string, categorySlugs: string[] = []): string[] {
    return [
      '/',
      `/${slug}`,
      storeSlug ? `/stores/${storeSlug}` : '',
      ...categorySlugs.flatMap((c) => [`/category/shopping-category/${c}`, `/category/shopping-site/${c}`]),
    ];
  }
}
