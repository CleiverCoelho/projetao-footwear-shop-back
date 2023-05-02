import { getAllproducts, getProductbyBrand, getProductbyName } from "./products.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";

const productsrouter = Router();

productsrouter.get('/produtos/:marca', validaModelo(produtocommarca),getProductbyBrand);
productsrouter.get('/produtos/:nome', validaModelo(produtocomnome), getProductbyName);
productsrouter.get('/produtos', getAllproducts );

export default productsrouter;