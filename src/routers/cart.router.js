import { getCartProducts, postCart } from "../controllers/cart.controller.js";
import { Router } from "express";

const cartRouter = Router();

cartRouter.get('/cart', getCartProducts );
cartRouter.post('/cart', postCart);

export default cartRouter;