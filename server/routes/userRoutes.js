import { signUp, signIn, updateUser, getUsers, getUser, signUpSampleUsers } from "../controllers/UserController.js";
import { Router } from "express";
import authJwt from "../middlewares/authJwt.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/updateprofile", authJwt, updateUser);
userRouter.post("/getusers", authJwt, getUsers);
userRouter.post("/getuser", authJwt, getUser);
userRouter.post("/sampleusers", signUpSampleUsers);
// userRouter.post("/sampleusers", authJwt, signUpSampleUsers);

export default userRouter;