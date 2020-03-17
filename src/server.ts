const express = require('express');
import { Application, Request, Response } from 'express';
const mongoose = require('mongoose');

const { BeerProduct } = require('./models');

// Connect to database
const dataBaseURL: string = 'mongodb://127.0.0.1/test_bev_db';
mongoose.connect(dataBaseURL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, });
const db = mongoose.connection;
db.on('open', () => console.log('Now connected to DB'));

const app: Application = express();

app.use(express.json());

app.post('/beer_products', (req: Request, res: Response) => {
  const productInstance = new BeerProduct(req.body.product);
  productInstance.save((err: Error) => {
    if (err) console.error(err);
    res.status(200).send(productInstance);
  });
});

app.get('/beer_products', (req: Request, res: Response) => {
  const query = BeerProduct.find();
  const queryResult = query.exec();
  queryResult.then((data: JSON) =>{
    res.status(200).send(data)});
});

app.put('/beer_products/:id', (req: Request, res: Response) => {
  console.log('bod ',req.body)
  console.log('id ',req.params.id)
  const query = BeerProduct.findOneAndUpdate(
    { _id: req.params.id }, 
    { $set: req.body.product }, 
    { new: true }, 
    (err: Error, data: JSON) => {
      console.error('? ', err)
      console.log('data in put: ', data)
      res.status(200).send(data);
    }
  )
  
});

app.delete('/beer_products', (req: Request, res: Response) => {
  const { _id } = req.body;
  BeerProduct.findOneAndDelete({ _id }).then((data: JSON) =>
    res.status(200).send(data)
  );
});

app.get('*', (req: Request, res: Response)=>{
  res.status(404).send('Error: 404')
})

const PORT = 3000;
app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));
