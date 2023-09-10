# NextJS and NextAuth demo

Example on how to sign in using Credentials, Github and Google.

## Docker

Run the command in package.json scripts to start the containers. Visit `http://localhost:5050` to create the database server and the database. You can find the credentials to login in pgAdmin4 in the docker-compose.yml file.

## Prisma

Use the migrations to create the database tables.

## Available providers

Visit `http://localhost:3000/api/auth/providers` for a list with the available providers for this application.
