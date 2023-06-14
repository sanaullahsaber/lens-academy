import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../From/CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  
  return (
    <div className="w-6/12 mx-auto ">
      <Elements stripe={stripePromise}>
       <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};
// 04:31:47 / 06:12:49
export default Payment;
