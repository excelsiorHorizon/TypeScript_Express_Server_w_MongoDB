const mongoose = require('mongoose');

// Setup schemas
const { Schema } = mongoose;
const options = { dicriminatorKey: 'type' };

const ProductSchema = new Schema(
  {
    product_name: String,
    product_description: String,
    currency: String,
    price: Number,
    package_quantity: Number,
  },
  options
);

const Product = mongoose.model('product', ProductSchema);

const BeerProduct = Product.discriminator(
  'BeerProduct',
  new mongoose.Schema(
    {
      container_type: String,
      unit_volume: Number,
      unit_measurment_type: String,
    },
    options
  )
);

module.exports = {
  BeerProduct,
};

// const BeerSchema = new Schema({
//   // img_url: String,
//   type: String,
//   product_name: String,
//   package_quantity: Number,
//   unit_volume: Number,
//   unit_measurment_type: String,
//   container_type: String,
//   // product_description: String,
//   // current_offer: String,
// });
