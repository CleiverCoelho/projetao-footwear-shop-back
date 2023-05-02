import { admPostProducts, getAllproducts, getProductbyBrand, getProductbyName } from "../controllers/products.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";
import { Router } from "express";

const productsrouter = Router();

productsrouter.get('/products/:brand', getProductbyBrand);
productsrouter.get('/products', getAllproducts );
productsrouter.post('/products', admPostProducts);

export default productsrouter;