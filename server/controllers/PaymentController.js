import User from "../models/UserSchema.js";
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

const addCredits = async(req,res) => {
    try {
        const { count } =req.body;

        if(!req.user.id || !count){
                  throw new Error("All Fields Are Required");
              }
        
              const user = await User.findOneAndUpdate(
                  { _id: req.user.id},
                  { $inc: { credits: +count } },
                  { new: true }
              );
              
            return res.status(200).json({ success: true, credits: user.credits });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export { createOrder, addCredits };