import razorpay from "../razorpay/razorpay.config.js";

const createOrder = async(req,res) => {
    try {
        const { amount } = req.body;

        if(!amount) {
            throw new Error("All Fields Are Required");
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.status(201).json({ success: true, order });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export { createOrder };