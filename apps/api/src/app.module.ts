import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DealsModule } from './deals/deals.module';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { RedirectModule } from './redirect/redirect.module';
import { HealthModule } from './health/health.module';
import { RevalidateModule } from './revalidate/revalidate.module';
import { AdminModule } from './admin/admin.module';
import { IngestModule } from './ingest/ingest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RevalidateModule,
    DealsModule,
    StoresModule,
    CategoriesModule,
    RedirectModule,
    HealthModule,
    AdminModule,
    IngestModule,
  ],
})
export class AppModule {}
