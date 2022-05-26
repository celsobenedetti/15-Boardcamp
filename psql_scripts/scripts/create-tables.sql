CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "stockTotal" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL,
  "pricePerDay" INTEGER NOT NULL
);

CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "cpf" VARCHAR(11) NOT NULL,
  "birthday" DATE NOT NULL
);


CREATE TABLE "rentals" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INTEGER NOT NULL,
  "gameId" INTEGER NOT NULL,
  "rentDate" DATE NOT NULL,
  "daysRented" INTEGER NOT NULL,
  "returnDate" DATE,
  "originalPrice" INTEGER NOT NULL,
  "delayFee" INTEGER
);
