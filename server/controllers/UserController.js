import UserModel from "../models/UserModel.js";

import { compareSync, hashSync } from "bcrypt";

import jwt from "jsonwebtoken";
import SETTINGS from "../config.js";

export const signUp = async (req, res) => {
    const { firstName, lastName, phone, email, password, userType } = req.body;
    console.log(req.body)
    if (!firstName || !lastName || !phone || !email || !password) {
        return res.status(401).json({ Entries: "The fields cannot be empty." })
    }

    const newUser = new UserModel(
        {
            firstName,
            lastName,
            phone,
            email,
            userType,
            password: hashSync(password, 10)
        }
    )
    // Trying to create a new user record.
    try {
        const userExist = await UserModel.findOne({ email: email, userType: userType })
        if (userExist) {
            return res.status(208).json({ Info: "Account already Exist." })
        }
        else {
            const userCreated = await newUser.save();
            if (userCreated) {
                return res.status(201).json({ Success: "Account created successfully." })
            }
            else {
                return res.status(400).json({ Failure: "Something went wrong." })
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

export const signIn = async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password) {
        return res.status(401).json({ Entries: "Email or Password field cannot be empty." })
    }

    // Trying to login.

    try {

        // checking if the account with the user input email exist in the DB.
        const userExist = await UserModel.findOne({ email: email, userType: userType })

        // comparing the password input by the user and existing password in the db.
        if (userExist) {
            const passwordMatched = compareSync(password, userExist.password)
            if (passwordMatched) {
                const JWT_TOKEN = jwt.sign({ id: userExist._id }, SETTINGS.JWT_SECRET, { expiresIn: SETTINGS.JWT_EXPIRY })
                return res.status(201).json(
                    {
                        Success: "You have logged in successfully.",
                        auth_token: JWT_TOKEN,
                        userData: {
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            email: userExist.email,
                            userType: userExist.userType,
                            userId: userExist._id,
                            shippingAddress: "Shipping Address"
                        }
                    }
                )
            }
            else {
                return res.status(401).json({ Info: "Invalid Credentials." })
            }
        }
        else {
            return res.status(404).json({ Failure: "Account does not exist." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

export const updateUser = async (req, res) => {
    const { firstName, lastName, email, } = req.body

}