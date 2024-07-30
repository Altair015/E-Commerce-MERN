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
        isActive: {
            type: Boolean,
            default: true
        },
        shippingAddress: {
            type: {
                shipName: {
                    type: String,
                    default: "",
                },
                addressLine1: {
                    type: String,
                    default: "",
                },
                addressLine2: {
                    type: String,
                    default: "",
                },
                city: {
                    type: String,
                    default: "",
                },
                state: {
                    type: String,
                    default: "",
                },
                country: {
                    type: String,
                    default: "",
                },
                pincode: {
                    type: Number,
                    default: "",
                },
                shipPhone: {
                    type: Number,
                    default: "",
                }
            },
            _id: false,
            default: {}
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'modified_on'
        },
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret.id; // Converting the userId object to the string
                delete ret.id;
                // delete ret._id; // Remove _id field from JSON output
                delete ret.password; // Remove password field from JSON output
                delete ret.__v; // Remove __v field if necessary
                delete ret.created_at;
                delete ret.modified_on;
            }
        }
    }
)

const UserModel = model("UserModel", userSchema);
export default UserModel;