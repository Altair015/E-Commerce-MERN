import { Schema, model } from "mongoose";
import ProductModel from "./ProductModel.js";
import UserModel from "./UserModel.js";

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: UserModel
        },
        products: {
            type: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: ProductModel
                    },
                    quantity: {
                        type: Number,
                    }
                }
            ],
            _id: false,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'modified_on'
        },
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret.userId.toString(); // Converting the userId object to the string
                ret.cartId = ret.id; // Rename _id to cartId in JSON output
                delete ret.id;
                delete ret._id; // Remove _id field from JSON output
                delete ret.__v; // Remove __v field if necessary
                delete ret.created_at;
                delete ret.modified_on;
            }
        }
    }
);

const CartModel = model("CartModel", cartSchema);
export default CartModel;
