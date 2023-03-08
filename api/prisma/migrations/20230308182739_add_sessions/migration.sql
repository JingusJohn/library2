/*
  Warnings:

  - Added the required column `user_agent` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "user_agent" TEXT NOT NULL;
