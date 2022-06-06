CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.procucts" (
	"id" serial NOT NULL,
	"name" bigint NOT NULL,
	"price" real NOT NULL,
	"main_picture" integer NOT NULL,
	"category_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	CONSTRAINT "procucts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.pictures" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL UNIQUE,
	CONSTRAINT "pictures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.product_pictures" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"picture_id" integer NOT NULL,
	CONSTRAINT "product_pictures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.categories" (
	"id" serial NOT NULL,
	"id" serial(255) NOT NULL UNIQUE,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sizes" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL UNIQUE,
	CONSTRAINT "sizes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.purchases" (
	"id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	"date" DATE(255) NOT NULL DEFAULT 'now',
	"user_id" integer(255) NOT NULL DEFAULT 'now',
	"adress_id" integer(255) NOT NULL DEFAULT 'now',
	CONSTRAINT "purchases_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.purchase_items" (
	"id" serial NOT NULL,
	"quantity" integer NOT NULL DEFAULT '1',
	"price_at_purchase" real NOT NULL,
	"product_id" integer NOT NULL,
	"purchase_id" integer NOT NULL,
	CONSTRAINT "purchase_items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.adresses" (
	"id" serial NOT NULL,
	"city" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"number" integer(255) NOT NULL,
	"postal_code" integer(255) NOT NULL,
	CONSTRAINT "adresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "procucts" ADD CONSTRAINT "procucts_fk0" FOREIGN KEY ("main_picture") REFERENCES "pictures"("id");
ALTER TABLE "procucts" ADD CONSTRAINT "procucts_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "procucts" ADD CONSTRAINT "procucts_fk2" FOREIGN KEY ("size_id") REFERENCES "sizes"("id");


ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_fk0" FOREIGN KEY ("product_id") REFERENCES "procucts"("id");
ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_fk1" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id");



ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fk1" FOREIGN KEY ("adress_id") REFERENCES "adresses"("id");

ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_fk0" FOREIGN KEY ("product_id") REFERENCES "procucts"("id");
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_fk1" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id");











