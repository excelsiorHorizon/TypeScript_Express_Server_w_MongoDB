"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
// Connect to database
const dataBaseURL = 'mongodb://127.0.0.1/test_bev_db';
mongoose_1.default.connect(dataBaseURL, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on('open', () => console.log('Now connected to DB'));
const app = express_1.default();
app.use(express_1.default.json());
app.post('/beer_products', (req, res) => {
    const productInstance = new models_1.BeerProduct(req.body.product);
    productInstance.save((err) => {
        if (err)
            console.error(err);
        res.status(200).send(productInstance);
    });
});
app.get('/beer_products', (req, res) => {
    const query = models_1.BeerProduct.find();
    const queryResult = query.exec();
    queryResult.then(data => res.status(200).send(data));
});
app.put('/beer_products', (req, res) => {
    const { _id, dataToUpdate } = req.body.data;
    models_1.BeerProduct.findByIdAndUpdate({ _id }, dataToUpdate).then(() => {
        models_1.BeerProduct.findOne({ _id }).then(data => {
            console.log('data in find one', data);
            res.status(200).send(data);
        });
    });
});
app.delete('/beer_products', (req, res) => {
    const { _id } = req.body;
    models_1.BeerProduct.findOneAndDelete({ _id }).then(data => res.status(200).send(data));
});
const PORT = 3000;
app.listen(PORT, () => console.log(`now listening at port: ${PORT}`));
