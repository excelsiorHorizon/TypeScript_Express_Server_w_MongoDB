# Anheuser-Busch InBev: Code challenge

## Installation

In order to run this server it will be necessary to first install MongoDB.

If already installed skip to next section.

Please visit the link below for various recommended installation guides.
https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials

## Initializing the Server Environment

Once you have MongoDB installed its time to initialize the server envinronment using the following commands.

From the top level of the app enter to load the required dependencies:

`npm install`

next its time to compile our TypeScript code into ES6 JS:

`npm run build`

This command will also create a folder called dist to store the code.

Now to run the JS server enter:

`npm start`

In the console you should see a notification indicating that our server is now running on port 3000 and that a successful
connection to the database has been created.

To test the integrity of the API endpoints a suite of tests has been built to test the functionality of the following.

GET - POST - PUT - DELETE

To run the tests enter:

`npm run test`

The output to the console will list the results of the test.

Note in order for the tests to run, the JS version of the server must first be built. 


