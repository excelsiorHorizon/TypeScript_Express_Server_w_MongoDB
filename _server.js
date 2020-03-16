const express = require('express');

const mongoose = require('mongoose');

const URL = 'mongodb://localhost/catsdb';

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Database connected: ', URL));

const kittySchema = new mongoose.Schema({
  name: String,
  breed: String,
});

const Kitten = mongoose.model('Kitten', kittySchema);

const oliver = new Kitten({ name: 'Oliver', breed: 'American Shorthair' });
const Lubby = new Kitten({ name: 'Lubby', breed: 'Unknown' });

oliver.save((err, sucess) => {
  if (err) return console.error(err);
  console.log('hooray');
});

// define model and schema

// const { Schema } = mongoose;
// const BeverageSchema = new Schema({
//   brand: String,
//   product: String,
//   price: String,
//   offer: String,
// });

// const BeverageModel = mongoose.model('CurrentProducts', BeverageSchema);

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));
