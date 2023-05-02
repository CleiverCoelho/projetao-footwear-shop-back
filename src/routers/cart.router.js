import { getCartProducts, postCart, changeProductCart, deleteProduct } from "../controllers/cart.controller.js";
import { Router } from "express";

const cartRouter = Router();

cartRouter.get('/cart', getCartProducts );
cartRouter.post('/cart/:id', postCart);
cartRouter.put('/cart/:id', changeProductCart);
cartRouter.delete('/cart/:id', deleteProduct);

export default cartRouter;