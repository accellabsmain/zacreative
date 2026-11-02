-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" TEXT NOT NULL,
    "igPostId" TEXT NOT NULL,
    "caption" TEXT,
    "permalink" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "slides" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_igPostId_key" ON "InstagramPost"("igPostId");

-- CreateIndex
CREATE INDEX "InstagramPost_publishedAt_idx" ON "InstagramPost"("publishedAt");

