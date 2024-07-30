import OrderModel from "../models/OrderModel.js";

export function averageRating(product, avgReview = 0) {
        if (product.reviews.length > 1) {
                product.reviews.map(
                        ({ rating }) => {
                                avgReview += rating
                        }
                )
                avgReview = avgReview / product.reviews.length
        }
        else if (product.reviews.length === 1) {
                avgReview += product.reviews[0].rating
        }

        return avgReview;
}


export async function updateProduct(product, productId, userId, orderId) {
        await OrderModel.findOneAndUpdate(
                { userId, "orders._id": orderId, "orders.products.productId": productId },
                {
                        $set: {
                                "orders.$[order].products.$[product]": {
                                        ...product,
                                }
                        }
                },
                {
                        arrayFilters: [
                                { "order._id": orderId },
                                { "product.productId": productId }
                        ],
                        new: true,
                        useFindAndModify: false
                }
        );
}

export async function updateProductsAndOrders(arr, model, userId, orderId, orderAmount) {
        let updatedProducts = {}
        const updatedArry = await Promise.all(
                arr.map(
                        async (product) => {
                                const productQuantity = await model.findById({ _id: product.productId })
                                if (productQuantity && productQuantity.quantity > 0) {

                                        const difference = productQuantity.quantity - product.quantity
                                        let quantityTobeUpdatedInProducts = productQuantity.quantity;
                                        if (difference > 0) {
                                                quantityTobeUpdatedInProducts = productQuantity.quantity - product.quantity
                                        }
                                        else if (difference < 0) {
                                                quantityTobeUpdatedInProducts = productQuantity.quantity
                                                product.quantity = product.quantity + difference
                                        }
                                        else if (difference === 0) {
                                                quantityTobeUpdatedInProducts = productQuantity.quantity
                                        }

                                        const productQuantityUpdated = await model.updateOne(
                                                { _id: product.productId },
                                                {
                                                        $set: { quantity: quantityTobeUpdatedInProducts }
                                                }
                                        )
                                        if (difference >= 0 && productQuantityUpdated) {
                                                console.log("***********")
                                                updatedProducts = await updateProduct(product, product.productId, userId, orderId)
                                        }
                                }
                                return product
                        }
                )
        );
        return updatedArry
}

export async function updatedOrders(iterable, orderId, userId, model) {
        const orderUpdated = await model.findOneAndUpdate(
                { userId, "orders._id": orderId },
                {
                        $set: {
                                "orders.$[order]": {
                                        ...iterable,
                                }
                        }
                },
                {
                        arrayFilters: [
                                { "order._id": orderId },
                        ],
                        new: true,
                        useFindAndModify: false
                }
        );
        if (orderUpdated) {
                return orderUpdated
        }
}