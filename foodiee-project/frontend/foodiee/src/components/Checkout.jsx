import './Checkout.css'
import Navbar from './Navbar/Navbar';
import Cart from './Checkout/Cart';
import Payment from './Checkout/Payment';

const Checkout = () => {
  return (
    <>
        {/* Adding navbar, cart and payment components */}
        <Navbar />
        <div className="checkout-container">
            <Cart />
            <Payment />
        </div>
    </>

  )
}

export default Checkout