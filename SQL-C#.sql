CREATE DATABASE pixo;
GO

use pixo

--טבלת לקוחות
CREATE TABLE customers (
    Id INT IDENTITY PRIMARY KEY,
    FullName NVARCHAR(50),
    Email NVARCHAR(50) UNIQUE,
	birthday date,
    Phone NVARCHAR(20)
);

--טבלת קטגוריה
CREATE TABLE Categories (
    Id INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

--טבלת מוצרים
CREATE TABLE Products (
    Id INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    Description NVARCHAR(100),
    Price DECIMAL(10,2),
    ImageUrl NVARCHAR(50),
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id)
);

--ALTER TABLE Products
--DROP COLUMN Description;

--טבלת מידות
CREATE TABLE Sizes (
    Id INT IDENTITY PRIMARY KEY,
    SizeName NVARCHAR(20)
);

--ALTER TABLE Products
--ADD SizeId INT;
 
--ALTER TABLE Products
--ADD CONSTRAINT FK_Products_Sizes
--FOREIGN KEY (SizeId) REFERENCES Sizes(Id);

ALTER TABLE Products
ADD Type NVARCHAR(20);

--הזמנה לכל הזמנה חיבור לפרטי הזמנה ובכל מוצר יש חיבור להתאמה האישית שלו

CREATE TABLE Customizations (
    Id INT IDENTITY PRIMARY KEY,
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
    TextToPrint NVARCHAR(200),
    ColorText NVARCHAR(30),
    SizeText int
);

CREATE TABLE Orders (
    Id INT IDENTITY PRIMARY KEY,
    customerId INT FOREIGN KEY REFERENCES customers(Id),
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalPrice DECIMAL(10,2)
);

CREATE TABLE OrderItems (
    Id INT IDENTITY PRIMARY KEY,
    OrderId INT FOREIGN KEY REFERENCES Orders(Id),
    ProductId INT FOREIGN KEY REFERENCES Products(Id),
	CustomizationsId INT FOREIGN KEY REFERENCES Customizations(Id),
    Quantity INT,
    PricePerUnit DECIMAL(10,2)
);

create table Type(
 Id int IDENTITY PRIMARY KEY,
 Name NVARCHAR(20)
 )

EXEC sp_rename 'Products.Type', 'TypeId', 'COLUMN';


ALTER TABLE Products
ALTER COLUMN TypeId INT;


 ALTER TABLE Products
ADD CONSTRAINT FK_Products_Type
FOREIGN KEY (TypeId) REFERENCES Type(Id);



-- 👤 Customers
INSERT INTO Customers (FullName, Email, Birthday, Phone)
VALUES 
('נועה כהן', 'noa@example.com', '1998-05-21', '050-1234567'),
('דניאל לוי', 'daniel@example.com', '1995-10-02', '052-9876543');

-- 🏷️ Categories
INSERT INTO Categories (Name)
VALUES  ('לבוש ואופנה'),('גאדג׳טים ומתנות'),('לבית');

-- 📏 Sizes
INSERT INTO Sizes (SizeName)
VALUES ('S'), ('M'), ('L'), ('300ml'), ('500ml'),('oneSize');

INSERT INTO Type (Name)
VALUES ('חולצות'), ('כובעים'), ('כוסות'), ('מחזיקי מפתחות'), ('כריות'),('תיקים');


-- 🛍️ Products
INSERT INTO Products (Name, Price, ImageUrl, CategoryId, SizeId, TypeId)
VALUES
('חולצת לוגו', 59.90, 'images/shirt1.jpg', 1, 2,1),
('חולצת Oversize', 69.90, 'images/shirt2.jpg', 1, 3,2),
('כוס צבעונית', 39.90, 'images/cup1.jpg', 2, 4,2),
('תיק בד ממותג', 49.90, 'images/bag1.jpg', 3, NULL,2);



-- 🎨 Customizations
INSERT INTO Customizations (ProductId, TextToPrint, ColorText, FontName, SizeText)
VALUES
(1, 'Best Day Ever', 'שחור', 'Arial', 14),
(3, 'Coffee Time ☕', 'אדום', 'Calibri', 12);

--ALTER TABLE Customizations
--add  FontName nvarchar(20)

-- 🧾 Orders
INSERT INTO Orders (customerId, TotalPrice)
VALUES 
(1, 159.70),
(2, 89.90);

-- 📦 OrderItems
INSERT INTO OrderItems (OrderId, ProductId, CustomizationsId, Quantity, PricePerUnit)
VALUES
(1, 1, 1, 2, 59.90),
(1, 3, 2, 1, 39.90),
(2, 2, NULL, 1, 69.90),
(2, 4, NULL, 1, 49.90);