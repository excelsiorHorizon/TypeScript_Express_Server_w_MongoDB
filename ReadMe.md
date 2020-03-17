# Anheuser-Busch InBev: Code challenge

## Installation

Before running an local installation of MongoDB is necessary for the project to run.

If already installed skip to next section.

Please visit the link below for various recommended installation guides.
https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials

## Initializing the Server Environment

Once you have MongoDB installed to initialize the server envinronment use the following commands.

`npm install`

Next its time to compile our TypeScript code into ES6 JS:

`npm run build`

This command will create a dist folder to store the code.

Now to run the JS server enter:

`npm start`

In the console you should see a notification indicating that our server is now running on port 3000 and that a successful connection to the database has been created.

A development TypeScript version of the server can also be ran by entering:

`npm run dev`

## Testing

To test the integrity of the API endpoints a suite of tests has been built to test the functionality of the following.

GET - POST - PUT - DELETE

To run the test suite enter:

`npm run test`

*Note in order for the tests to run, the JS version of the server must first be built.



