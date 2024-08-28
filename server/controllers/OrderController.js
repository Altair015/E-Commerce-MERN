import CartModel from "../models/CartModel.js";
import OrderModel from "../models/OrderModel.js";

// Creating/Inserting order the very first order.
export async function createOrder(req, res) {
    let { userId, products, shippingAddress, payment, shippingStatus, amount } = req.body;

    if (products.length > 1) {
        products = products.map(
            (product) => {
                delete product.reviews
                delete product.productQuantity
                return product
            }
        )
    }
    else {
        delete products[0].reviews
        delete products[0].productQuantity
    }

    try {
        const ordersFound = await OrderModel.findOne({ userId });
        if (ordersFound) {
            const orderInserted = await OrderModel.findOneAndUpdate(
                {
                    userId
                },
                {
                    $push: {
                        orders: {
                            products,
                            shippingAddress,
                            payment,
                            amount
                        }
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )

            if (orderInserted) {
                const cartEmptied = await CartModel.findOneAndDelete({ userId })
                if (cartEmptied) {
                    console.log(cartEmptied)
                    return res.status(201).json({ success: "Order Created Successfully", orderInserted })
                }
            }
        }
        else if (!ordersFound) {
            const createOrder = new OrderModel(
                {
                    userId,
                    orders: [
                        {
                            products,
                            shippingAddress,
                            payment,
                            shippingStatus,
                            amount
                        }
                    ]
                }
            )
            const orderCreated = await createOrder.save();

            if (orderCreated) {
                const cartEmptied = await CartModel.findOneAndDelete({ userId })
                if (cartEmptied) {
                    return res.status(201).json({ success: "Order Created Successfully", orderCreated })
                }
            }
        }
        else {
            return res.status(400).json({ Failure: "Something went wrong." })

        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Function which returns all orders for admin and specific orders for user.
export async function getOrders(req, res) {
    const { userId, userType } = req.params;

    try {
        let ordersFound = null;
        if (userType === "admin") {
            ordersFound = await OrderModel.find();
            if (ordersFound) {
                return res.status(201).json({ ordersFound: ordersFound })
            }
        }
        else if (userType === "user") {
            ordersFound = await OrderModel.findOne({ userId });
            if (ordersFound) {
                return res.status(201).json({ ...ordersFound.toJSON() })
            }
        }
        if (!ordersFound) {
            return res.status(404).json({ ordersNotFound: "No Records Found." })
        }
        return res.status(400).json("something went wrong")
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Function returning specific order with specific ID.
export async function getOrder(req, res) {
    const { orderId } = req.params;

    try {
        const orderFound = await OrderModel.findOne(
            {
                "orders._id": orderId
            }
        )

        const orderLength = Object.keys(orderFound).length
        if (orderLength) {
            const order = orderFound.toJSON().orders.filter(
                (order) => {
                    return order.orderId === orderId
                }
            )
            return res.status(201).json({ ...order[0] })
        }
        else if (!orderLength) {
            return res.status(404).json({ orderNotFound: "Order does not match any record." })
        }
        else {
            return res.status(400).json({ Failure: "Something went wrong." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Function to update the specific order
export async function updateOrder(req, res) {
    const { userId, orderId, ...rest } = req.body;
    const { shippingStatus } = rest
    const { paymentStatus } = rest.payment

    // automating the payment status to Refund in case the order is cancelled or returned
    if (shippingStatus === "Cancelled" && !paymentStatus.includes("Refund Initiated")) {
        rest.payment.paymentStatus = "Refund Initiated"
    }

    //finding the order with specific ID.
    try {
        const orderFound = await OrderModel.findOneAndUpdate(
            {
                "orders._id": orderId,
            },
            {
                $set: {
                    "orders.$[order]": {
                        ...rest,
                        _id: orderId
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

        if (orderFound.orders) {
            const order = orderFound.toJSON().orders.filter(
                (order) => {
                    return order.orderId === orderId
                }
            )
            return res.status(201).json({ ...order[0] })
        }
        else if (!orderFound) {
            return res.status(404).json({ orderNotFound: "Order ID does not match any record." })
        }
        else {
            return res.status(400).json({ Failure: "Something went wrong." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}