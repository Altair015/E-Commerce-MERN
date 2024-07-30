import { signUp, signIn, updateUser, getUsers, getUser, signUpSampleUsers } from "../controllers/UserController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/updateprofile", updateUser);
userRouter.post("/getusers", getUsers);
userRouter.post("/getuser", getUser);
userRouter.post("/sampleusers", signUpSampleUsers);

export default userRouter;