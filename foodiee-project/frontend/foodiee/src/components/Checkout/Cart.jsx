
import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext); //getting cartitems and removeFromCart method from storecontext using usecontext.

  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty</p>
        
      ) : (
        <table className='cart-table'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cartItems).map(([itemName, itemDetails]) => (
              <tr key={itemName} className='cart-item'>
                <td className='item-name'>{itemName}</td>
                <td className='item-quantity'>{itemDetails.quantity}</td>
                <td className='item-price'>₹{itemDetails.price}</td>
                <td>
                  <button className='remove-button' onClick={() => removeFromCart(itemName)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
