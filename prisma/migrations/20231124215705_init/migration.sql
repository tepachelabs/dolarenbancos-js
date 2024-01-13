-- CreateTable
CREATE TABLE "Bank"
(
    "id"        TEXT    NOT NULL,
    "createdAt" TIMESTAMP(3)     DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name"      TEXT    NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price"
(
    "id"        SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "sell"      DOUBLE PRECISION,
    "buy"       DOUBLE PRECISION,
    "bankId"    TEXT   NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_id_key" ON "Bank" ("id");

-- AddForeignKey
ALTER TABLE "Price"
    ADD CONSTRAINT "Price_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
