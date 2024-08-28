
import { useContext } from 'react';
import './Food.css';
import { StoreContext } from '../../context/StoreContext';

const Food = ({ item }) => {

    //cartItems variable with cart items. 
    //addToCart , removeFromCart methods to add and remove items from cart.
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);      

    return (
        <div className="food-item">
            <div className="food-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="food-content">
                <div className="food-title-rating">
                    <div className="title">{item.name}</div>
                    <div className="rating">{item.rating} ⭐</div>
                </div>
                <div className="desc">{item.description}</div>
                <div className="food-price-add">
                    <div className="price">₹ {item.price}</div>
                    {!cartItems[item.name] ? (
                        <button className='add' onClick={() => { addToCart(item.name, item.price) }}>Add</button>
                    ) : (
                        <div className="add-rem-buttons">
                            <div className='rem-button' onClick={() => { removeFromCart(item.name) }}> - </div>
                            <p>{cartItems[item.name].quantity}</p>
                            <div className='add-button' onClick={() => { addToCart(item.name, item.price) }}> + </div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Food;
