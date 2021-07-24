# Storefront API

API that has records of various products, users and orders that users have placed.

## Dependency Installation

To install all required dependencies use:

`npm install`

or

`yarn`

## Local Setup

To run this project locally you will have to create Database and User with all GRANTed permissions.

### Creating Database

Connect to your `psql` terminal and run following command

- CREATE DATABASE storefront;
- CREATE DATABASE storefront_test;

The above command with create two databases, one for dev and other one for testing.

For creating users and granting privileges:

- CREATE USER storefront_user WITH PASSWORD 'admin12345';
- \c storefront;
- GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
- \c storefront_test;
- GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;

**Note: **Database are connected to default port: `5432`

## Migrations

In the root directory of project run the following command

`db-migrate up`

It will have migrations applied and create table in database.

## Environment variables

You will need to set following environment variable in `.env` file:

```
DATABASE_HOST = '127.0.0.1'
DATABASE_DB = 'storefront'
DATABASE_TEST_DB = 'storefront_test'
DATABASE_USER = 'storefront_user'
DATABASE_PASSWORD = 'admin12345'

ENV = 'dev'
SECRET_TOKEN = 'somerandomsecrettoken'
BCRYPT_PASSWORD = 'somerandomencryption'
SALT_ROUNDS = '10'
```

Try to add the exact variables if you create database using the above mentioned commands. But if you change the database name and user credentials then you will need to update them here accordingly.

## Running the Backend

After gtting all of the above mentioned steps done you need to run

`npm run dev`

It will start the server on `localhost:3001`

## Test

To run the test us the following command:

`npm run test`
