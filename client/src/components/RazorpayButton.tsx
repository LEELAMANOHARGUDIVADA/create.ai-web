import { useEffect } from "react";

const RazorpayButton = () => {
    
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", "pl_QB2ZrVHjqAa4uO");
    
    const form = document.createElement("form");
    form.appendChild(script);

    document.getElementById("razorpay-container").appendChild(form);

    return () => {
      document.getElementById("razorpay-container").innerHTML = ""; // Cleanup on unmount
    };
  }, []);

  return <div id="razorpay-container" className="mt-5"></div>;
};

export default RazorpayButton;
