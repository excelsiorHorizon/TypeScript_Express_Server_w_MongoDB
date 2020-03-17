"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Setup schemas
const options = { dicriminatorKey: 'type' };
const ProductSchema = new mongoose_1.Schema({
    product_name: String,
    product_description: String,
    currency: String,
    price: Number,
    package_quantity: Number,
}, options);
const Product = mongoose_1.model('Product', ProductSchema);
exports.BeerProduct = Product.discriminator('BeerProduct', new mongoose_1.Schema({
    container_type: String,
    unit_volume: Number,
    unit_measurment_type: String,
}, options));
// module.exports = {
//   BeerProduct,
// };
