/*
  Warnings:

  - You are about to drop the column `scheduled_in` on the `makes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `makes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "makes" DROP CONSTRAINT "makes_user_id_fkey";

-- AlterTable
ALTER TABLE "makes" DROP COLUMN "scheduled_in",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "scheduled_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "makes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
