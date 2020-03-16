const mongoose = require('mongoose');
const axios = require('axios');
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

const dataBaseURL = 'mongodb://127.0.0.1/test_bev_db';

describe('BeerProduct Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      dataBaseURL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  let testID = null;
  let testProduct = null;
  it('Create & save user successfully to database', async () => {
    const validItem = new BeerProduct(testBeerData);
    const savedItem = await validItem.save();

    testProduct = savedItem;
    testID = savedItem._id.toString();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.product_name).toBe(testBeerData.product_name);
    expect(savedItem.product_description).toBe(
      testBeerData.product_description
    );
    expect(savedItem.currency).toBe(testBeerData.currency);
    expect(savedItem.price).toBe(testBeerData.price);
    expect(savedItem.package_quantity).toBe(testBeerData.package_quantity);
    expect(savedItem.container_type).toBe(testBeerData.container_type);
    expect(savedItem.unit_volume).toBe(testBeerData.unit_volume);
    expect(savedItem.unit_measurment_type).toBe(
      testBeerData.unit_measurment_type
    );
  });
  let productRes = null;
  it('Data returned from beer_products get endpoint should contain newly created product', async () => {
    let containsId = false;
    try {
      const response = await axios.get('http://localhost:3000/beer_products');
      for (const product of response.data) {
        if (product._id === testID) {
          containsId = true;
          productRes = product;
        }
      }
    } catch (error) {
      console.error(error);
    }
    expect(containsId).toBe(true);
  });

  it('Should return matching data from API endpoint', () => {
    expect(testProduct.product_name).toBe(productRes.product_name);
    expect(testProduct.product_description).toBe(
      testBeerData.product_description
    );
    expect(testProduct.currency).toBe(productRes.currency);
    expect(testProduct.price).toBe(productRes.price);
    expect(testProduct.package_quantity).toBe(productRes.package_quantity);
    expect(testProduct.container_type).toBe(productRes.container_type);
    expect(testProduct.unit_volume).toBe(productRes.unit_volume);
    expect(testProduct.unit_measurment_type).toBe(
      productRes.unit_measurment_type
    );
  });

  it('Put request should modify the product correctly', async () => {
    const putTestBeerData = {
      __t: 'BeerProduct',
      _id: testID,
      product_name: 'Bud Light Mini',
      product_description:
        'Bud Light is a refreshing American-style light lager beer with a clean, crisp taste and fast finish.',
      currency: 'gbp',
      price: 11.0,
      package_quantity: 24,
      container_type: 'bottle',
      unit_volume: 236.588,
      unit_measurment_type: 'ml',
    };

    const { data } = await axios.put('http://localhost:3000/beer_products', {
      data: {
        _id: testID,
        dataToUpdate: putTestBeerData,
      },
    });
    expect(data.product_name).toBe(putTestBeerData.product_name);
    expect(data.product_description).toBe(putTestBeerData.product_description);
    expect(data.currency).toBe(putTestBeerData.currency);
    expect(data.price).toBe(putTestBeerData.price);
    expect(data.package_quantity).toBe(putTestBeerData.package_quantity);
    expect(data.container_type).toBe(putTestBeerData.container_type);
    expect(data.unit_volume).toBe(putTestBeerData.unit_volume);
    expect(data.unit_measurment_type).toBe(
      putTestBeerData.unit_measurment_type
    );
  });

  it('Delete request should remove recently created product from database', async () => {
    let isDeleted = true;
    try {
      await axios.delete('http://localhost:3000/beer_products', {
        data: { _id: testID },
      });
      const response = await axios.get('http://localhost:3000/beer_products');
      for (const product of response.data) {
        if (product._id === testID) isDeleted = false;
      }
    } catch (error) {
      console.error(error);
    }
    expect(isDeleted).toBe(true);
  });
});
