/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `ApplicationUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `ApplicationUser` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ApplicationUser] ADD [Email] VARCHAR(256) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[ApplicationUser] ADD CONSTRAINT [UQ_Application_Email] UNIQUE NONCLUSTERED ([Email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
