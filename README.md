## Feature

**MySQL**

Already supports using mysql database. Don't forget to create a local env. Change the **.env.example** file to **.env.local**.

**KNEX** ([http://knexjs.org/](http://knexjs.org/))

Already supports *query builder*. Making it easier to perform operations to the database, such as database migrations, joins, selects, updates etc. Change the **knexfile.example.js** file to **knexfile.js**, and adjust to the local database configuration.

## Getting Started

**First**, do database migration
```bash
# knex migrate
npm knex migrate:latest
# or
yarn knex migrate:latest
```

If you want to add a new table, you can do this by:
```bash
# knex make table migration
npm knex migrate:make table_migration_name
# or
yarn knex migrate:make table_migration_name
```

Then, re-migrate.

**Next**, run the development server:

```bash
npm run dev
# or
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Page or View

There are several main pages

[Home](http://localhost:3000) can be accessed on [http://localhost:3000](http://localhost:3000)

[Info Beasiswa](http://localhost:3000/info-beasiswa) can be accessed on [http://localhost:3000/info-beasiswa](http://localhost:3000/info-beasiswa)

[IELTS Material](http://localhost:3000/ielts-material) can be accessed on [http://localhost:3000/ielts-material](http://localhost:3000/ielts-material)

## Rest Full API

There are several main endpoints

**Payment Type**

Get all data, can be accessed on [http://localhost:3000/api/payments/types](http://localhost:3000/api/payments/types) method GET

Get data by ID, can be accessed on [http://localhost:3000/api/payments/type/1](http://localhost:3000/api/payments/type/1) method GET

Create data, can be accessed on [http://localhost:3000/api/payments/types](http://localhost:3000/api/payments/types) method POST

Update data, can be accessed on [http://localhost:3000/api/payments/types](http://localhost:3000/api/payments/types) method PUT

Delete by ID, can be accessed on [http://localhost:3000/api/payments/type/1](http://localhost:3000/api/payments/type/1) method DELETE

**Info Beasiswa**

Get all data, can be accessed on [http://localhost:3000/api/info-beasiswa](http://localhost:3000/api/info-beasiswa)

Get data by ID, can be accessed on [http://localhost:3000/api/info-beasiswa/1](http://localhost:3000/api/info-beasiswa/1)

Create data, can be accessed on [http://localhost:3000/api/info-beasiswa](http://localhost:3000/api/info-beasiswa) method POST

Update data, can be accessed on [http://localhost:3000/api/info-beasiswa](http://localhost:3000/api/info-beasiswa) method PUT

Delete by ID, can be accessed on [http://localhost:3000/api/info-beasiswa/1](http://localhost:3000/api/info-beasiswa/1) method DELETE

**IELTS Material**

Get all data, can be accessed on [http://localhost:3000/api/ielts-material](http://localhost:3000/api/ielts-material)

Get data by ID, can be accessed on [http://localhost:3000/api/ielts-material/1](http://localhost:3000/api/ielts-material/1)

Create data, can be accessed on [http://localhost:3000/api/ielts-material](http://localhost:3000/api/ielts-material) method POST

Update data, can be accessed on [http://localhost:3000/api/ielts-material](http://localhost:3000/api/ielts-material) method PUT

Delete by ID, can be accessed on [http://localhost:3000/api/ielts-material/1](http://localhost:3000/api/ielts-material/1) method DELETE
