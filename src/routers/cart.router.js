import { getCartProducts, postCart } from "./cart.controller.js";

const cartRouter = Router();

cartRouter.get('/cart', getCartProducts );
cartRouter.post('/cart', postCart);

export default cartRouter;