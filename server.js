const express = require('express');
const mongoose = require('mongoose');

const { BeerProduct } = require('./models');

// Connect to database
const dataBaseURL = 'mongodb://127.0.0.1/test_bev_db';
mongoose.connect(dataBaseURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('open', () => console.log('Now connected to DB'));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!');
});

app.post('/beer_products', (req, res) => {
  console.log('post hit ');
  const productInstance = new BeerProduct(req.body.product);

  productInstance.save(err => {
    if (err) console.error(err);
    res.send(productInstance);
  });
});

app.get('/beer_products', (req, res) => {
  const query = BeerProduct.find();
  const queryResult = query.exec();
  queryResult.then(data => res.send(data));
});

app.put('/beer_products', (req, res) => {
  const { _id, dataToUpdate } = req.body;
  BeerProduct.findByIdAndUpdate({ _id }, dataToUpdate).then(() => {
    BeerProduct.findOne({ _id }).then(data => res.send(data));
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));
