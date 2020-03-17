const axios = require('axios');
const mongoose = require('mongoose');
const { BeerProduct } = require('../dist/models.js');

const testBeerData = {
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
    BeerProduct.findOne({ _id: data._id }).then(item => {
      expect(item.product_name).toBe(testBeerData.product.product_name);
    });
  });

  it('Gets all beer products', async () => {
    const postResponse = await axios.post(
      'http://localhost:3000/beer_products',
      testBeerData
    );
    const getResponse = await axios.get('http://localhost:3000/beer_products');
    expect(postResponse.data._id).toBe(getResponse.data[0]._id);
  });

  it('Modifies existing BeerProduct', async () => {
    const getResponse = await axios.post(
      'http://localhost:3000/beer_products',
      testBeerData
    );
    const { data } = getResponse;
    data.price = 12.99;
    const putResponse = await axios.put('http://localhost:3000/beer_products', {
      _id: data._id,
      dataToUpdate: data,
    });
    expect(putResponse.data.price).toBe(data.price);
  });

  it('Deletes item from database', async () => {
    const postResponse = await axios.post(
      'http://localhost:3000/beer_products',
      testBeerData
    );
    const IDtoDelete = postResponse.data._id;
    const deleteResponse = await axios.delete(
      'http://localhost:3000/beer_products',
      {
        data: { _id: IDtoDelete },
      }
    );
    expect(deleteResponse.data._id).toBe(IDtoDelete);
  });
});
