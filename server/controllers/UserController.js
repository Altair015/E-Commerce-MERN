import { compareSync, hash, hashSync } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
config()

const { JWT_SECRET, JWT_EXPIRY } = process.env;
// Contoroller for creating new user.
export const signUp = async (req, res) => {
    const { firstName, lastName, phone, email, password, userType } = req.body;
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
            password: hashSync(password, 10),
        }
    )
    // Trying to create a new user record.
    try {
        const userExist = await UserModel.findOne({ email: email })
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

// Controller for loggin in of user and return auto token.
export const signIn = async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password) {
        return res.status(401).json({ Entries: "Email or Password field cannot be empty." })
    }

    // Trying to login.

    try {
        // checking if the account with the user input email exist in the DB.
        const userExist = await UserModel.findOne({ email: email })

        // comparing the password input by the user and existing password in the db.
        if (userExist) {
            if (userExist.userType === userType) {
                const passwordMatched = compareSync(password, userExist.password);
                if (passwordMatched) {
                    const JWT_TOKEN = jwt.sign({ id: userExist._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
                    return res.status(201).json(
                        {
                            Success: "You have logged in successfully.",
                            auth_token: JWT_TOKEN,
                            userData: userExist.toJSON()
                        }
                    )
                }
                else {
                    return res.status(401).json({ Info: "Invalid Credentials." })
                }
            }
            else {
                return res.status(401).json({ Info: `Invalid Account Type.` })
            }
        }
        else {
            return res.status(404).json({ Failure: "Account does not exist." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller for updating user details.
export const updateUser = async (req, res) => {

    const { userId, ...rest } = req.body;

    if (Object.keys(rest).length === 0) {
        return res.status(208).json({ "Info": "No changes performed" });
    }

    let updatedFields = {}

    if (rest.shippingAddress) {
        for (const key in rest.shippingAddress) {
            updatedFields[`shippingAddress.${key}`] = rest.shippingAddress[key]
        }
        delete rest.shippingAddress
    }

    updatedFields = { ...updatedFields, ...rest }

    try {
        const userFoundAndUpdated = await UserModel.findByIdAndUpdate(
            {
                _id: userId,
            },
            { $set: updatedFields },
            {
                new: true, // To return the updated document
                useFindAndModify: false // Deprecation warning workaround
            }
        );
        if (userFoundAndUpdated) {
            const findUser = await UserModel.findById({
                _id: userId,
            })
            return res.status(201).json({ Success: "User Data Updated Successfully", updatedUserData: findUser.toJSON() });
        }
        else {
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller for returning all the users.
export const getUsers = async (req, res) => {
    const { userId, userType } = req.body;
    if (userType.toLowerCase() !== 'admin') {
        return res.statu(401).json({ UnAuthorized: "You are not authorized." })
    }

    try {
        const usersFound = await UserModel.find({ userType: { $ne: 'admin' } });
        if (usersFound) {
            const usersFoundJson = usersFound.map(user => user.toJSON());
            return res.status(201).json({ Users: usersFoundJson })
        }
        else if (!usersFound) {
            return res.status(404).json({ UsersNotFound: "Users Not Found." })
        }
        else {
            return res.status(404).json({ Failure: "Account does not exist." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller for returing specific user details.
export const getUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const userFound = await UserModel.findOne({ _id: userId });
        if (userFound) {
            return res.status(201).json({ userFound: userFound.toJSON() })
        }
        else if (!userFound) {
            return res.status(404).json({ UserNotFound: "User Not Found." })
        }
        else {
            return res.status(404).json({ Failure: "Something went wrong." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller for creating sample users.
export const signUpSampleUsers = async (req, res) => {
    const { userData } = req.body;

    try {
        if (!Array.isArray(userData)) {
            return res.status(400).json({ message: "userData should be an array." });
        }

        // Function to hash passwords for each user object
        const hashPasswords = async (users) => {
            const saltRounds = 10;

            // Use map() to hash passwords asynchronously
            const hashedUsers = await Promise.all(users.map(async (user) => {
                const hashedPassword = await hash(user.password, saltRounds);
                return { ...user, password: hashedPassword };
            }));

            return hashedUsers;
        };

        // Hash passwords for the provided userData
        const hashedUserData = await hashPasswords(userData);

        // Create users with hashed passwords in the database
        const userCreated = await UserModel.create(hashedUserData);

        if (userCreated) {
            return res.status(201).json({ Success: "Users created successfully." });
        } else {
            return res.status(400).json({ Failure: "Failed to create users." });
        }
    } catch (error) {
        console.error("Error in signUpSampleUsers:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

