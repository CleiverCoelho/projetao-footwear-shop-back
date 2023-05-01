import { getCartProducts } from "./cart.controller.js";

const cartRouter = Router();

cartRouter.get('/cart', getCartProducts );

export default cartRouter;