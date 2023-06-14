import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useContext, useEffect, useState } from "react";
import useSelected from "../../../hooks/useSelected";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const [bookedCourse] = useSelected();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const enrollClass = bookedCourse.find((classes) => classes._id === id);
  const price = enrollClass?.price;
  console.log("enrolledClassssssssss", price);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((response) => {
        console.log(response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    
    
    
    if (confirmError) {
      console.log(confirmError);
    }
    

    console.log("payment intent", paymentIntent);
    

    
    setProcessing(false);
    



    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentMethod.id)
      // const transactionId = paymentIntent.id;
      // Save payments information to database server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        data: new Date(),
        status: "service pending",
        enrolledClassId: enrollClass?._id,
        enrollCourseId: enrollClass?.courseId,

        enrolledClassImage: enrollClass?.image,
        enrolledClassName: enrollClass?.className,
        instructorName: enrollClass?.instructor?.name,
        availableSeats: enrollClass?.availableSeats,
      };
      axiosSecure
        .post("/payments", payment)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Payment added successfully",
              showConfirmButton: true,
              // timer: 1500,
              confirmButtonText: "Ok",
            });
            console.log("hoise  payment");
            navigate("/dashboard/my-selected-course");
          } else {
            console.log("Error: Inserted ID not found in response data");
            // Handle the error condition
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          // Handle the error condition
        });

    }














    
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-base-300"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay ${price}
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
