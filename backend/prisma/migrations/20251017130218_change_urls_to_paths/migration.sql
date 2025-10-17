/*
  Warnings:

  - You are about to drop the column `coverPhotoUrl` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `pdfFileUrl` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `coverPhotoUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `coverPhotoUrl` on the `Tutorial` table. All the data in the column will be lost.
  - Added the required column `pdfFilePath` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPhotoPath` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPhotoPath` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" DROP COLUMN "coverPhotoUrl",
DROP COLUMN "pdfFileUrl",
ADD COLUMN     "coverPhotoPath" TEXT,
ADD COLUMN     "pdfFilePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Course" DROP COLUMN "coverPhotoUrl",
ADD COLUMN     "coverPhotoPath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tutorial" DROP COLUMN "coverPhotoUrl",
ADD COLUMN     "coverPhotoPath" TEXT NOT NULL;
