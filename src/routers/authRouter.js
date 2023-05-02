import { Router } from "express";
import { getUserData, signIn, signUp } from "../controllers/auth.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", validamodelo(signUpSchema), signUp);
authRouter.post("/sign-in", validamodelo(signInSchema), signIn);
authRouter.get("/user", getUserData);

export default authRouter;