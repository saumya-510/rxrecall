const { PrismaClient } = require('@prisma/client');

const DATABASE_URL = "postgresql://postgres:RxRecall%402026@db.umnlclsspkaypcxyivqc.supabase.co:5432/postgres";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

module.exports = prisma;