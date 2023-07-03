npm init -y
npm install typescript ts-node @types/node --save-dev

int tyeScript:
npx tsc --init

npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint

instalar: 
npm install @prisma/client fastify fastify-zod zod zod-to-json-schema @fastify/jwt dotenv
npm install @fastify/cookie @fastify/cors @fastify/multipart @fastify/static @fastify/swagger @fastify/swagger-ui @sendgrid/mail

npm i @fastify/cors

prisma: init
npx prisma init --datasource-provider postgresql

prisma: migrate
npx prisma migrate dev --name init

npx prisma migrate dev --create-only (Ejecutar sin aplicar)
npx prisma migrate dev (Aplicar)

prisma: show database
npx prisma studio# jlc-inventario
