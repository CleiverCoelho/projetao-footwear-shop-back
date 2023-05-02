import { getAllproducts, getProductbyBrand, getProductbyName } from "../controllers/products.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";
import { Router } from "express";

const productsrouter = Router();

productsrouter.get('/produtos/:brand', getProductbyBrand);
productsrouter.get('/produtos', getAllproducts );

export default productsrouter;