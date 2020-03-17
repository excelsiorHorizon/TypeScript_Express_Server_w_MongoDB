const axios = require('axios');
const mongoose = require('mongoose');
const { BeerProduct } = require('../models');

const testBeerData = {
  product_name: 'Budweiser Nitro Gold',
  product_description:
    'Brewed with toasted caramel malt and infused with nitro for a silky-smooth finish.',
  currency: 'usd',
  price: 9.99,
  package_quantity: 6,
  container_type: 'can',
  unit_volume: 12,
  unit_measurment_type: 'oz',
};

describe('BeerProduct API', () => {
  beforeEach(async () => {
    await mongoose.connect(
      'mongodb://127.0.0.1/test_bev_db',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterEach(() => {
    BeerProduct.deleteMany({}).exec();
  });

  it('Creates a beer product', async () => {
    const { data } = await axios.post(
      'http://localhost:3000/beer_products',
      testBeerData
    );

    BeerProduct.findOne({ _id: data._id }).exec(item => {
      expect(item.product_name).toBe(testBeerData.product_name);
    });
  });

  it('Gets all beer products', async () => {
    const existingBeer = BeerProduct(testBeerData);
    existingBeer.save();

    BeerProduct.findOne({ _id: existingBeer._id }).exec(beer => {
      console.log('-----existingBeer: ', beer);
    });

    const { data } = await axios.get('http://localhost:3000/beer_products');
    console.log('-----All teh beers: ', data);

    const firstBeer = data[0];
    expect(firstBeer.product_name).toBe(testBeerData.product_name);
  });

  // it('Should return matching data from API endpoint', () => {
  //   expect(testProduct.product_name).toBe(productRes.product_name);
  //   expect(testProduct.product_description).toBe(
  //     testBeerData.product_description
  //   );
  //   expect(testProduct.currency).toBe(productRes.currency);
  //   expect(testProduct.price).toBe(productRes.price);
  //   expect(testProduct.package_quantity).toBe(productRes.package_quantity);
  //   expect(testProduct.container_type).toBe(productRes.container_type);
  //   expect(testProduct.unit_volume).toBe(productRes.unit_volume);
  //   expect(testProduct.unit_measurment_type).toBe(
  //     productRes.unit_measurment_type
  //   );
  // });

  // it('Put request should modify the product correctly', async () => {
  //   const putTestBeerData = {
  //     __t: 'BeerProduct',
  //     _id: testID,
  //     product_name: 'Bud Light Mini',
  //     product_description:
  //       'Bud Light is a refreshing American-style light lager beer with a clean, crisp taste and fast finish.',
  //     currency: 'gbp',
  //     price: 11.0,
  //     package_quantity: 24,
  //     container_type: 'bottle',
  //     unit_volume: 236.588,
  //     unit_measurment_type: 'ml',
  //   };

  //   const { data } = await axios.put('http://localhost:3000/beer_products', {
  //     data: {
  //       _id: testID,
  //       dataToUpdate: putTestBeerData,
  //     },
  //   });
  //   expect(data.product_name).toBe(putTestBeerData.product_name);
  //   expect(data.product_description).toBe(putTestBeerData.product_description);
  //   expect(data.currency).toBe(putTestBeerData.currency);
  //   expect(data.price).toBe(putTestBeerData.price);
  //   expect(data.package_quantity).toBe(putTestBeerData.package_quantity);
  //   expect(data.container_type).toBe(putTestBeerData.container_type);
  //   expect(data.unit_volume).toBe(putTestBeerData.unit_volume);
  //   expect(data.unit_measurment_type).toBe(
  //     putTestBeerData.unit_measurment_type
  //   );
  // });

  // it('Delete request should remove recently created product from database', async () => {
  //   let isDeleted = true;

  //   await axios.delete('http://localhost:3000/beer_products', {
  //     data: { _id: testID },
  //   });
  //   const response = await axios.get('http://localhost:3000/beer_products');
  //   for (const product of response.data) {
  //     if (product._id === testID) isDeleted = false;
  //   }

  //   expect(isDeleted).toBe(true);
  // });
});
