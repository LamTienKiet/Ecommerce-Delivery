-- Columns added to schema.prisma without a migration.
-- Guarded because databases created with `prisma db push` already have them.
IF COL_LENGTH('dbo.CartItem', 'note') IS NULL
    ALTER TABLE [dbo].[CartItem] ADD [note] NVARCHAR(500);

IF COL_LENGTH('dbo.OrderItem', 'note') IS NULL
    ALTER TABLE [dbo].[OrderItem] ADD [note] NVARCHAR(500);

IF COL_LENGTH('dbo.Order', 'deliveryFee') IS NULL
    ALTER TABLE [dbo].[Order] ADD [deliveryFee] DECIMAL(18,2) NOT NULL CONSTRAINT [Order_deliveryFee_df] DEFAULT 0;

IF COL_LENGTH('dbo.Order', 'discount') IS NULL
    ALTER TABLE [dbo].[Order] ADD [discount] DECIMAL(18,2) NOT NULL CONSTRAINT [Order_discount_df] DEFAULT 0;

IF COL_LENGTH('dbo.Order', 'fullName') IS NULL
    ALTER TABLE [dbo].[Order] ADD [fullName] NVARCHAR(100) NOT NULL CONSTRAINT [Order_fullName_df] DEFAULT '';

IF COL_LENGTH('dbo.Order', 'note') IS NULL
    ALTER TABLE [dbo].[Order] ADD [note] NVARCHAR(500);

IF COL_LENGTH('dbo.Order', 'orderType') IS NULL
    ALTER TABLE [dbo].[Order] ADD [orderType] VARCHAR(20) NOT NULL CONSTRAINT [Order_orderType_df] DEFAULT 'delivery';

IF COL_LENGTH('dbo.Order', 'phone') IS NULL
    ALTER TABLE [dbo].[Order] ADD [phone] VARCHAR(20) NOT NULL CONSTRAINT [Order_phone_df] DEFAULT '';

IF COL_LENGTH('dbo.Order', 'promoCode') IS NULL
    ALTER TABLE [dbo].[Order] ADD [promoCode] VARCHAR(50);
