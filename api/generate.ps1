$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketplace"
npx prisma generate --schema=prisma/schema.prisma
