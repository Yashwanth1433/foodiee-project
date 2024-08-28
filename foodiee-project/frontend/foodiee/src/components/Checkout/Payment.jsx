import { useContext } from 'react'
import './Payment.css'
import PaymentForm from './PaymentForm'
import { StoreContext } from '../../context/StoreContext'
import { insertOrders } from '../../services/services'
import { useNavigate } from 'react-router-dom'


const Payment = () => {

    const navigate = useNavigate();    //to navigate

    const {insertCartToDatabase, cartDb, totalPayable} = useContext(StoreContext);    //Using variables and methods in storecontext using usecontext.

    const handleClick = async ()=>{
        insertCartToDatabase();        
        await insertOrders(cartDb);       //insert data into database.
        navigate("/thankyou")   //navigating to thankyou page.
    }

  return (
    <div className='payment-container'>
        <div className="payment-gateway">
            <div className="payment-form">
                <PaymentForm />
            </div>
            <div className="payment-button">
                <button className='pay-button' disabled={totalPayable <= 0 && true} onClick={handleClick} >Pay {totalPayable > 0 ? `₹${totalPayable}` : ""}</button>
            </div>
        </div>
    </div>
  )
}

export default Payment