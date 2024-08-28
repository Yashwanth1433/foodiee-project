
import { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = () => {

  //setting true or false for what to display.
  const [isCard, setIsCard] = useState(false);
  const [isUpi, setIsUpi] = useState(false);
  const [isCod, setIsCod] = useState(false);

  //to display credit/debit card form.
  const handleCard = () => {
    setIsCard(true);
    setIsUpi(false);
    setIsCod(false);
  };

  //to display upi.
  const handleUpi = () => {
    setIsCard(false);
    setIsUpi(true);
    setIsCod(false);
  };

  //to display cash on delivery.
  const handleCod = () => {
    setIsCard(false);
    setIsUpi(false);
    setIsCod(true);
  };

  return (
    <>
      <div className="payment-form">
        <div className="payment-mode">

          <div className="payment-methods">
            <button onClick={handleCard}>Credit/Debit</button>
            <button onClick={handleUpi}>UPI</button>
            <button onClick={handleCod}>COD</button>
          </div>
        </div>

        <div className="payment-details">

            {/* display to select message if none are true. */}
            {!isCard && !isCod && !isUpi && <h3>Please select payment method.</h3>}

            {/* display credit or debit card if it is true */}
            {isCard && 
            
            <div className="card-method">
            <div className="card-number">
              <label htmlFor="cardNumber">Card Number : </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter your card number"
              />
            </div>

            <div className="card-name">
              <label htmlFor="nameOnCard">Name : </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                placeholder="Name on the card"
              />
            </div>

            <div className="expiry">
              <label htmlFor="expiryDate">Expiry Date : </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
              />
            </div>

            <div className="cvv">
              <label htmlFor="cvv">CVV : </label>
              <input type="text" id="cvv" name="cvv" placeholder="***" />
            </div>
          </div>
            
            }

          {/* display upi if it is true */}
          {isUpi && 
          
            <div className="upi-method">
                <label htmlFor="upiId">UPI ID : </label>
                <input type="tel" id="upiId" name="upiId" placeholder="Enter your UPI ID" />
            </div>
          
          }


          {/* display cod if it is true */}
          {isCod && 
          
            <div className="cod-method">
                <img src="/payondelivery.jpg" alt="" />
                <h3>You will pay upon delivery.</h3>
            </div>
          
          }

          
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
