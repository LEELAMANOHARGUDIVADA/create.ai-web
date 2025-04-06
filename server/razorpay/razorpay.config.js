import dotenv from "dotenv"
dotenv.config({
    path: '../.env'
});
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: 'rzp_test_eKQ6gjusEiSlAV',
    key_secret: 'y24yKqnQTCh1sAzWLqfQlkWf'
});


export default razorpay;