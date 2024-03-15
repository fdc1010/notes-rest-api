# Notes RestAPI Build with TypeORM

Steps to run this project:

1. Run `pnpm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `pnpm start` command

Setup your .env file

```
PORT = 19200
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = <postgres username>
DB_PASSWORD = <postgres password>
DB_DATABASE = <db>
JWT_SECRET = <jwt secret>
```