BEGIN TRANSACTION;
CREATE TABLE Category (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "Category" VALUES('categoria-eletronicos-techforge','Eletrônicos','2026-03-19 00:35:49','2026-03-19 00:35:49');
CREATE TABLE "Order" (
  id TEXT PRIMARY KEY NOT NULL,
  quantity INTEGER NOT NULL,
  userId TEXT NOT NULL,
  productId TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES Product(id) ON DELETE RESTRICT
);
INSERT INTO "Order" VALUES('pedido-demo-techforge',2,'admin-techforge-001','produto-notebook-techforge','2026-03-19 00:35:49','2026-03-19 00:35:49');
CREATE TABLE Product (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  ownerId TEXT NOT NULL,
  categoryId TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(ownerId) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY(categoryId) REFERENCES Category(id) ON DELETE RESTRICT
);
INSERT INTO "Product" VALUES('produto-notebook-techforge','Notebook',3500.0,'admin-techforge-001','categoria-eletronicos-techforge','2026-03-19 00:35:49','2026-03-19 00:35:49');
CREATE TABLE User (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  cpf TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "User" VALUES('admin-techforge-001','Administrador Tech Forge','admin@techforge.com','$2b$10$wHcGJ0A3h0oUYnwM0zj5Z.Lg9sYfS6C5EMF4iAfDdc0AGJi/7luW2','52998224725','ADMIN','2026-03-19 00:35:49','2026-03-19 00:35:49');
CREATE INDEX idx_product_ownerId ON Product(ownerId);
CREATE INDEX idx_product_categoryId ON Product(categoryId);
CREATE INDEX idx_order_userId ON "Order"(userId);
CREATE INDEX idx_order_productId ON "Order"(productId);
COMMIT;