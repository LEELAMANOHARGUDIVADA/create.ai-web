import axios from "axios"
import Razorpay from "razorpay"
import { useEffect } from "react";
import { images } from "../constants/images";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function PaymentButton({ amount }){
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      

    const handlePayment = async(event:React.FormEvent) => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/v1/payment/createOrder`, {
                amount
            });
            
            if (window !== "undefined" && !window.Razorpay) {
                alert("Razorpay SDK failed to load. Please check your internet connection.");
                return;
              }

            const options = {
                key: "rzp_test_eKQ6gjusEiSlAV",
                amount: amount,
                currency: "INR",
                name: "Create.ai",
                description: "Subscription Plan",
                order_id: response.data.id,
                handler: async function(response) {
                  console.log(response);
                  alert("Payment Successful!");
                },
                callback_url: 'http://localhost:5173/dashboard'
                
              };
          
              const razorpayInstance = new window.Razorpay(options);
              razorpayInstance.open();
              event.preventDefault();
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="flex items-center justify-center">
            <button className="cursor-pointer px-5 py-2 mt-5 rounded-xl bg-violet-500 text-white" onClick={handlePayment}>Pay Now</button>
        </div>
    )
}