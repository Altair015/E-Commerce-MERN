import { Schema, model } from "mongoose";
import UserModel from "./UserModel.js"

const productSchema = new Schema(
    {
        image: {
            type: String,
            default: null
        },
        title: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number
        },
        reviews: {
            type: [
                {
                    rating: {
                        type: Number,
                        default: 0
                    },
                    comment: {
                        type: String
                    },
                    ratedBy: {
                        type: Schema.Types.ObjectId,
                        ref: UserModel
                    }
                }
            ],
            _id: false
        },
        category: {
            type: String
        },
        quantity: {
            type: Number
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: UserModel
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
                ret.productId = ret.id; // Converting the userId object to the string
                delete ret.id;
                delete ret._id; // Remove _id field from JSON output
                delete ret.__v; // Remove __v field if necessary
                delete ret.created_at;
                delete ret.modified_on;
            }
        }
    }
)

const ProductModel = model("ProductModel", productSchema);
export default ProductModel;