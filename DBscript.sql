
CREATE TABLE "Books"(
  "ISBN" integer,
  "Title" varchar(255),
  "Author" varchar(255),
  "Quantity" integer,
  "Location" integer,
  CONSTRAINT "Books_pkey" PRIMARY KEY("ISBN")
);

CREATE TABLE "Borrowers"(
  "ID" serial,
  "Name" varchar(255),
  "Email" varchar(255),
  rdate date,
  CONSTRAINT "Borrowers_pkey" PRIMARY KEY("ID")
);

CREATE TABLE "BorrowingDetails"(
"ISBN" integer, "ID" integer,
  CONSTRAINT "BorrowingDetails_pkey" PRIMARY KEY("ISBN", "ID")
);

ALTER TABLE "BorrowingDetails"
  ADD CONSTRAINT "BorrowingDetails_ISBN_fkey"
    FOREIGN KEY ("ISBN") REFERENCES "Books" ("ISBN");

ALTER TABLE "BorrowingDetails"
  ADD CONSTRAINT "BorrowingDetails_ID_fkey"
    FOREIGN KEY ("ID") REFERENCES "Borrowers" ("ID");
