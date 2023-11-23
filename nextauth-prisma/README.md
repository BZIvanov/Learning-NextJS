# NextJS and NextAuth demo

Example on how to sign in using Credentials, Github and Google.

## How to use?

1. Run `npm install` to install the dependencies.
2. Start the containers. Run the command in package.json scripts to start the containers.
3. Visit `http://localhost:5050` to create the database server and the database. You can find the credentials in the docker-compose.yml file to login in pgAdmin4. You can provide any name, when registering the Server and for the Connection tab you can see the correct configurations again in the docker-compose.yml file.
4. Now after we have the database server, we need to run the prisma migrations. Run the prisma migrate command from the package.json file.
5. Now after the dependencies are installed, docker containers are running, database server was created and the migrations are applied, we can start the application. Run the dev command from package.json file to start the Next.js application, you can access it on `http://localhost:3000`.
6. By now the application should be running, but you still need to configure Google and Github apps to be able to use them as providers.

## Available auth providers

Visit `http://localhost:3000/api/auth/providers` for a list with the available providers for this application.
