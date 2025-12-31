-- CreateTable
CREATE TABLE "feedbacks_table" (
    "id" SERIAL NOT NULL,
    "rating" SMALLINT NOT NULL,
    "date_time" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback_text" TEXT,

    CONSTRAINT "feedbacks_table_pkey" PRIMARY KEY ("id")
);

