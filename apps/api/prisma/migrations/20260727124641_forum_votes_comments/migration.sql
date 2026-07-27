-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "karma" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "DealVote" (
    "dealId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealVote_pkey" PRIMARY KEY ("dealId","userId")
);

-- CreateTable
CREATE TABLE "DealComment" (
    "id" SERIAL NOT NULL,
    "dealId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DealComment_dealId_id_idx" ON "DealComment"("dealId", "id");

-- CreateIndex
CREATE INDEX "Deal_status_score_idx" ON "Deal"("status", "score");

-- AddForeignKey
ALTER TABLE "DealVote" ADD CONSTRAINT "DealVote_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealVote" ADD CONSTRAINT "DealVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealComment" ADD CONSTRAINT "DealComment_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealComment" ADD CONSTRAINT "DealComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
