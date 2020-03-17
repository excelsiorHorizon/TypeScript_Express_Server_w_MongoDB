const axios = require('axios');
const mongoose = require('mongoose');
const { BeerProduct } = require('../dist/models.js');

mongoose.connect(
  'mongodb://127.0.0.1/test_bev_db',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);

let testBeerData;

describe('BeerProduct API', () => {
  beforeEach(() => {
    testBeerData = {
      product: {
        product_name: 'Budweiser Nitro Gold',
        product_description:
          'Brewed with toasted caramel malt and infused with nitro for a silky-smooth finish.',
        currency: 'usd',
        price: 9.99,
        package_quantity: 6,
        container_type: 'can',
        unit_volume: 12,
        unit_measurment_type: 'oz',
      },
    };
  });

  afterEach(() => {
    BeerProduct.deleteMany({}).exec();
  });

  it('Creates a beer product', () =>
    axios
      .post('http://localhost:3000/beer_products', testBeerData)
      .then(data => {
        BeerProduct.findOne({ _id: data._id }).then(item =>
          expect(item.product_name).toBe(testBeerData.product.product_name)
        );
      }));

  // it('Gets all beer products', async () => {
  //   const postResponse = await axios.post(
  //     'http://localhost:3000/beer_products',
  //     testBeerData
  //   );
  //   const getResponse = await axios.get('http://localhost:3000/beer_products');
  //   expect(postResponse.data._id).toBe(getResponse.data[0]._id);
  // });

  // it('Modifies existing BeerProduct', () => {
  //   const modifiedBeerData = { product: { product_name: 'Bud Light' } };
  //   axios
  //     .post('http://localhost:3000/beer_products', testBeerData)
  //     .then(postResponse =>
  //       axios.put(
  //         `http://localhost:3000/beer_products/${postResponse.data._id}`,
  //         modifiedBeerData
  //       )
  //     )
  //     .then(putResponse => {
  //       expect(putResponse.data.product_name).toBe(
  //         modifiedBeerData.product.product_name
  //       );
  //     });
  // });

  // it('Deletes item from database', async () => {
  //   const postResponse = await axios.post(
  //     'http://localhost:3000/beer_products',
  //     testBeerData
  //   );
  //   const IDtoDelete = postResponse.data._id;
  //   const deleteResponse = await axios.delete(
  //     'http://localhost:3000/beer_products',
  //     {
  //       data: { _id: IDtoDelete },
  //     }
  //   );
  //   expect(deleteResponse.data._id).toBe(IDtoDelete);
  // });
});
