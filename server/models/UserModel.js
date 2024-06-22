import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String
        },
        shippingAddress: {
            shipName: {
                type: String
            },
            addressLine1: {
                type: String
            },
            addressLine2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            pincode: {
                type: Number
            },
            shipPhone: {
                type: Number
            },
            _id: false
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'modified_on'
        }
    }
)

const UserModel = model("UserModel", userSchema);
export default UserModel;