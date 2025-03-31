/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "web"."Comment" DROP CONSTRAINT "Comment_postSlug_fkey";

-- DropForeignKey
ALTER TABLE "web"."Comment" DROP CONSTRAINT "Comment_username_fkey";

-- DropTable
DROP TABLE "web"."Comment";

-- CreateTable
CREATE TABLE "web"."PostView" (
    "id" SERIAL NOT NULL,
    "ipv6" VARCHAR(64) NOT NULL,
    "locationInfo" JSONB NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web"."PostComment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "web"."PostView" ADD CONSTRAINT "PostView_postId_fkey" FOREIGN KEY ("postId") REFERENCES "web"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web"."PostComment" ADD CONSTRAINT "PostComment_username_fkey" FOREIGN KEY ("username") REFERENCES "web"."users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web"."PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "web"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
