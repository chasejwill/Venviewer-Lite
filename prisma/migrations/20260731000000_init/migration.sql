CREATE TABLE "Tour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kuulaUrl" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Tour_slug_key" ON "Tour"("slug");
