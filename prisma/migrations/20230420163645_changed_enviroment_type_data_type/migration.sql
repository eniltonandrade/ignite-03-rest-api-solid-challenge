/*
  Warnings:

  - Changed the type of `environment_type` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "environment_type",
ADD COLUMN     "environment_type" "Size" NOT NULL;
