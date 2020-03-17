const express = require('express');
import { Application, Request, Response } from 'express';
import * as mongoose from 'mongoose';

const { BeerProduct } = require('./models');

// Connect to database
const dataBaseURL: string = 'mongodb://127.0.0.1/test_bev_db';
mongoose.connect(dataBaseURL, { useNewUrlParser: true, });
const db = mongoose.connection;
db.on('open', () => console.log('Now connected to DB'));

const app: Application = express();

app.use(express.json());

app.post('/beer_products', (req: Request, res: Response) => {
  const productInstance = new BeerProduct(req.body.product);

  productInstance.save((err: any) => {
    if (err) console.error(err);
    res.status(200).send(productInstance);
  });
});

app.get('/beer_products', (req: Request, res: Response) => {
  const query = BeerProduct.find();
  const queryResult = query.exec();
  queryResult.then((data: any) => res.status(200).send(data));
});

app.put('/beer_products', (req: Request, res: Response) => {
  const { _id, dataToUpdate } = req.body.data;

  BeerProduct.findByIdAndUpdate({ _id }, dataToUpdate).then(() => {
    BeerProduct.findOne({ _id }).then((data: any) => {
      console.log('data in find one', data);
      res.status(200).send(data);
    });
  });
});

app.delete('/beer_products', (req: Request, res: Response) => {
  const { _id } = req.body;
  BeerProduct.findOneAndDelete({ _id }).then((data: any) =>
    res.status(200).send(data)
  );
});

const PORT = 3000;
app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));