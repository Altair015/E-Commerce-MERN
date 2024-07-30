import { Schema, model } from "mongoose";
import ProductModel from "./ProductModel.js";
import UserModel from "./UserModel.js";

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: UserModel
        },
        orders: {
            type: [
                {
                    products: {
                        type: [
                            {
                                productId: {
                                    type: String,
                                    ref: ProductModel
                                },
                                quantity: {
                                    type: Number,
                                },
                                image: {
                                    type: String,
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
                                category: {
                                    type: String
                                },
                                sellerId: {
                                    type: Schema.Types.ObjectId,
                                    ref: UserModel
                                },
                            }
                        ],
                        _id: false
                    },
                    shippingAddress: {
                        type: {
                            shipName: {
                                type: String,
                                default: null,
                            },
                            addressLine1: {
                                type: String,
                                default: null,
                            },
                            addressLine2: {
                                type: String,
                                default: null,
                            },
                            city: {
                                type: String,
                                default: null,
                            },
                            state: {
                                type: String,
                                default: null,
                            },
                            country: {
                                type: String,
                                default: null,
                            },
                            pincode: {
                                type: Number,
                                default: null,
                            },
                            shipPhone: {
                                type: Number,
                                default: null,
                            }
                        },
                        _id: false,
                    },
                    payment: {
                        type: {
                            paymentMethod: {
                                type: String,
                                default: null,
                            },
                            paymentStatus: {
                                type: String,
                                default: "Not Paid"
                            }
                        },
                        _id: false,
                    },
                    shippingStatus: {
                        type: String,
                        default: "Processing"
                    },
                    amount: {
                        type: Number,
                        default: 0
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now()
                    }
                },
            ],
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
                if (ret.orders && ret.orders.length > 0) {
                    ret.orders = ret.orders.map(order => {
                        const orderId = order._id.toString()
                        delete order._id;
                        delete order.id;
                        return { ...order, orderId };
                    });
                }
                delete ret.id;
                delete ret._id; // Remove _id field from JSON output
                delete ret.__v; // Remove __v field if necessary
                delete ret.created_at;
                delete ret.modified_on;
            }
        }
    }
);

const OrderModel = model("OrderModel", orderSchema);

export default OrderModel;