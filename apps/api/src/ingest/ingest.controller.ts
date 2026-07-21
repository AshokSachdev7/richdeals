import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../admin/api-key.guard';
import { IngestService, TgMessage } from './ingest.service';

// Real-time receiver for the Telegram Chrome extension. It POSTs new deal
// messages here the instant they appear; we resolve + affiliate + push.
@UseGuards(ApiKeyGuard)
@Controller('admin/ingest')
export class IngestController {
  constructor(private readonly ingest: IngestService) {}

  @Post('telegram')
  async telegram(@Body() body: { messages: TgMessage[] }) {
    const msgs = Array.isArray(body?.messages) ? body.messages : [];
    let created = 0;
    const results: Array<{ ok: boolean; reason?: string; slug?: string }> = [];
    for (const m of msgs) {
      const r = await this.ingest.ingestTelegram(m);
      if (r.ok) created++;
      results.push(r);
    }
    return { received: msgs.length, created, results };
  }
}
