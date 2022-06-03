CREATE TABLE "states" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR UNIQUE NOT NULL
);

CREATE TABLE "cities" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
  "stateId" INTEGER NOT NULL REFERENCES "states"("id")
);

CREATE TABLE "customers" (
	"id" SERIAL PRIMARY KEY,
  "fullName" VARCHAR NOT NULL,
  "cpf" VARCHAR UNIQUE NOT NULL,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL
);

CREATE TABLE "customersAddresses" (
	"id" SERIAL PRIMARY KEY,
  "customerId" INTEGER UNIQUE NOT NULL REFERENCES "customers"("id"),
	"street" VARCHAR NOT NULL,
	"number" INTEGER NOT NULL,
	"complement" VARCHAR NOT NULL,
	"postalCode" VARCHAR NOT NULL,
  "cityId" INTEGER NOT NULL REFERENCES "cities"("id")
);

CREATE TYPE phone_type AS ENUM ('landline', 'mobile');
CREATE TABLE "customerPhones" (
	"id" SERIAL PRIMARY KEY,
  "customerId" INTEGER NOT NULL REFERENCES "customers"("id"),
  "number" INTEGER UNIQUE NOT NULL,
  "type" phone_type NOT NULL
);

CREATE TABLE "bankAccount" (
	"id" SERIAL PRIMARY KEY,
  "customerId" INTEGER UNIQUE NOT NULL REFERENCES "customers"("id"),
  "accountNumber" INTEGER UNIQUE NOT NULL,
  "agency" INTEGER NOT NULL,
  "openDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  "closeDate" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TYPE transaction_type AS ENUM ('deposit', 'withdraw');
CREATE TABLE "transactions" (
	"id" SERIAL PRIMARY KEY,
  "bankAccountId" INTEGER UNIQUE NOT NULL REFERENCES "bankAccount"("id"),
  "amount" REAL NOT NULL,
  "type" transaction_type NOT NULL,
  "description" TEXT NOT NULL,
  "canceled" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE "creditCards" (
	"id" SERIAL PRIMARY KEY,
  "bankAccountId" INTEGER UNIQUE NOT NULL REFERENCES "bankAccount"("id"),
  "name" VARCHAR NOT NULL,
  "number" INTEGER UNIQUE NOT NULL,
  "securityCode" INTEGER UNIQUE NOT NULL,
  "expirationMonth" INTEGER NOT NULL,
  "expirationYear" INTEGER NOT NULL,
  "password" VARCHAR NOT NULL,
  "limit" REAL NOT NULL
);
