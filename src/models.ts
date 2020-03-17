import {Schema, Model , model, Document, SchemaOptions} from 'mongoose';

// Setup schemas
const options: any  = { dicriminatorKey: 'type' };

const ProductSchema: Schema = new Schema(
  {
    product_name: String,
    product_description: String,
    currency: String,
    price: Number,
    package_quantity: Number,
  },
  options
);

interface IProduct extends Document {
    product_name: String;
    product_description: String;
    currency: String;
    price: Number;
    package_quantity: Number;
}

interface IBeerProduct extends Document {
    container_type: String;
    unit_volume: Number;
    unit_measurment_type: String;
}

const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);

const BeerProduct: Model<IBeerProduct> = Product.discriminator(
  'BeerProduct',
  new Schema(
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

