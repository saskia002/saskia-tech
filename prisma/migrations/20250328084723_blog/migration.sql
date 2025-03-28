/*
  Warnings:

  - You are about to drop the column `deleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `public` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog"."Category" DROP COLUMN "deleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "blog"."Comment" DROP COLUMN "deleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "blog"."Post" DROP COLUMN "deleted",
DROP COLUMN "public",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
