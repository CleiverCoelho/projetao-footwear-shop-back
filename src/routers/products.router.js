import { admPostProducts, getAllproducts, getProductbyBrand, getProductbyId } from "../controllers/products.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";
import { Router } from "express";

const productsrouter = Router();

productsrouter.get('/products/:brand', getProductbyBrand);
productsrouter.get('/products', getAllproducts );
productsrouter.get('/product/:id', getProductbyId);
productsrouter.post('/products', admPostProducts);


export default productsrouter;