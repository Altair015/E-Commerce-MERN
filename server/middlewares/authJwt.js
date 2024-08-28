import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { config } from "dotenv";

config()

const { JWT_SECRET } = process.env;

function authJwt(req, res, next) {
    const token = req.headers.authorization.split(" ");
    if (token[0] === "JWT") {
        jwt.verify(
            token[1],
            JWT_SECRET,
            async (err, verifiedToken) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({ failure: "Invalid Token" })
                }
                else {
                    try {
                        const user = await UserModel.findById(verifiedToken.id);
                        if (user) {
                            next()
                        }
                    }
                    catch (error) {
                        res.status(500).json({ msg: error.message })
                    }
                }
            }
        )
    }
    else {
        res.status(404).json({ failure: "Token Not Found." })
    }

}

export default authJwt;