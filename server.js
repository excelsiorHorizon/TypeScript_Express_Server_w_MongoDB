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

app.post('/beer_products', (req, res) => {
  const productInstance = new BeerProduct(req.body.product);

  productInstance.save(err => {
    if (err) console.error(err);
    res.status(200).send(productInstance);
  });
});

app.get('/beer_products', (req, res) => {
  const query = BeerProduct.find();
  const queryResult = query.exec();
  queryResult.then(data => res.status(200).send(data));
});

app.put('/beer_products', (req, res) => {
  console.log('put hit');
  console.log('body:', req.body);
  const { _id, dataToUpdate } = req.body.data;

  BeerProduct.findByIdAndUpdate({ _id }, dataToUpdate).then(() => {
    BeerProduct.findOne({ _id }).then(data => {
      console.log('data in find one', data);
      res.status(200).send(data);
    });
  });
});

app.delete('/beer_products', (req, res) => {
  const { _id } = req.body;
  BeerProduct.findOneAndDelete({ _id }).then(data =>
    res.status(200).send(data)
  );
});

const PORT = 3000;
app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));
