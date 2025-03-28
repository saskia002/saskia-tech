-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "saskia-tech";

-- CreateTable
CREATE TABLE "saskia-tech"."users" (
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "saskia-tech"."Category" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "saskia-tech"."Post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "img" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "categoryCode" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saskia-tech"."Comment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "saskia-tech"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_code_key" ON "saskia-tech"."Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "saskia-tech"."Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "saskia-tech"."Post"("slug");

-- AddForeignKey
ALTER TABLE "saskia-tech"."Post" ADD CONSTRAINT "Post_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "saskia-tech"."Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saskia-tech"."Post" ADD CONSTRAINT "Post_username_fkey" FOREIGN KEY ("username") REFERENCES "saskia-tech"."users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saskia-tech"."Comment" ADD CONSTRAINT "Comment_username_fkey" FOREIGN KEY ("username") REFERENCES "saskia-tech"."users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saskia-tech"."Comment" ADD CONSTRAINT "Comment_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "saskia-tech"."Post"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
