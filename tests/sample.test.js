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

const dataBaseURL = 'mongodb://127.0.0.1/test_bev_db';

describe('BeerProduct Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(
      dataBaseURL,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it('create & save user successfully', async () => {
    const validItem = new BeerProduct(testBeerData);
    const savedItem = await validItem.save();
    // Object Id should be defined when successfully saved to MongoDB.
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

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
  //   const userWithInvalidField = new UserModel({
  //     name: 'TekLoon',
  //     gender: 'Male',
  //     nickname: 'Handsome TekLoon',
  //   });
  //   const savedUserWithInvalidField = await userWithInvalidField.save();
  //   expect(savedUserWithInvalidField._id).toBeDefined();
  //   expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  // });

  // // Test Validation is working!!!
  // // It should us told us the errors in on gender field.
  // it('create user without required field should failed', async () => {
  //   const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
  //   let err;
  //   try {
  //     const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
  //     error = savedUserWithoutRequiredField;
  //   } catch (error) {
  //     err = error;
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  //   expect(err.errors.gender).toBeDefined();
  // });
});
