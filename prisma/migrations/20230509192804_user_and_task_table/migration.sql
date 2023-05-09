BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ApplicationUser] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [UserName] VARCHAR(256) NOT NULL,
    [FirstName] VARCHAR(256) NOT NULL,
    [LastName] VARCHAR(256) NOT NULL,
    [MiddleName] VARCHAR(256),
    [MobileNumber] VARCHAR(50) NOT NULL,
    [Gender] VARCHAR(6) NOT NULL,
    [DateOfBirth] DATETIME NOT NULL,
    [BloodGroup] VARCHAR(3) NOT NULL,
    [Address1] VARCHAR(700) NOT NULL,
    [Address2] VARCHAR(700),
    [City] VARCHAR(100),
    [State] VARCHAR(100),
    [PostalCode] INT,
    [Country] VARCHAR(100),
    CONSTRAINT [PK__ApplicationUser__Id] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UQ_Application_UserName] UNIQUE NONCLUSTERED ([UserName])
);

-- CreateTable
CREATE TABLE [dbo].[ApplicationUserMembership] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [AppilcationUserId] INT NOT NULL,
    [IsActive] BIT NOT NULL CONSTRAINT [DF__Applicati__IsAct__68487DD7] DEFAULT 0,
    [Password] NVARCHAR(250) NOT NULL,
    [PasswordSalt] NVARCHAR(250) NOT NULL,
    [SecurityQuestion] VARCHAR(500),
    [SecurityPassword] VARCHAR(500),
    [FirstTimeLogIn] BIT NOT NULL CONSTRAINT [DF__Applicati__First__693CA210] DEFAULT 1,
    [LockedOut] BIT NOT NULL CONSTRAINT [DF__Applicati__Locke__6A30C649] DEFAULT 0,
    [LastLoginDate] DATETIME,
    [LastPasswordChangedDate] DATETIME,
    [LastLockOutDate] DATETIME,
    CONSTRAINT [PK__ApplicationUserMembership__Id] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [ApplicationUserMembership_AppilcationUserId_key] UNIQUE NONCLUSTERED ([AppilcationUserId])
);

-- CreateTable
CREATE TABLE [dbo].[Tasks] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [Name] VARCHAR(256) NOT NULL,
    [Status] VARCHAR(100) NOT NULL,
    [Description] VARCHAR(1000) NOT NULL,
    [CreatedAt] DATETIME NOT NULL CONSTRAINT [DF__Tasks__CreatedAt__36B12243] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Tasks__Id] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UQ_Tasks_Name_User] UNIQUE NONCLUSTERED ([Name],[UserId])
);

-- AddForeignKey
ALTER TABLE [dbo].[ApplicationUserMembership] ADD CONSTRAINT [FK_ApplicationUserMembership_UserId] FOREIGN KEY ([AppilcationUserId]) REFERENCES [dbo].[ApplicationUser]([Id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tasks] ADD CONSTRAINT [FK_Tasks_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[ApplicationUser]([Id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
