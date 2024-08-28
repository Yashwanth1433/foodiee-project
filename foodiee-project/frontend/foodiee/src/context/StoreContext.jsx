
import { useState, useEffect, createContext } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [userName, setUserName] = useState("");         //to store username.
    const [cartItems, setCartItems] = useState({});      //to store cart items.

    const [cartDb, setCartDb] = useState([]);          //to store data in the format to store in database.

    const [totalPayable, setTotalPayable] = useState(0);  //to store total cost.

    useEffect(() => { 
        let cost = 0;
        Object.entries(cartItems).forEach(([itemName, { quantity, price }]) => {         //to calculate total cost.
            cost += price * quantity;
        });
        setTotalPayable(cost);      //setting to total payable
    
    }, [cartItems])      //trigger when cartitems change.



    //method to add items to cart
    const addToCart = (itemName, price) => {
        setCartItems((prev) => {

            const existingItem = prev[itemName] || { quantity: 0, price };   //if item excists take it or create one.
            const updatedCartItems = {         //update cart item.
                ...prev,
                [itemName]: {
                    quantity: existingItem.quantity + 1,
                    price: existingItem.price,
                }
            };

            return updatedCartItems;
        });
    };


    //remove item from cart.
    const removeFromCart = (itemName) => {
        setCartItems((prev) => {

            const existingItem = prev[itemName];        //get the item

            const updatedCartItems = { ...prev };       //get all items

            if (existingItem.quantity > 1) {
                updatedCartItems[itemName] = {
                    ...existingItem,                           //this line spreads the price component
                    quantity: existingItem.quantity - 1,         //decrease quantity
                };
            } else {
                delete updatedCartItems[itemName];            //remove item if quantity is 0
            }

            return updatedCartItems;
        });
    };



    //creating an list of cartitems with a pattern to store in db.
    const convertCartToDbFormat = () => {
        const ordersList = Object.entries(cartItems).map(([itemName, { quantity, price }]) => ({
            username: userName,
            fooditem: itemName,
            quantity: quantity,
            price: price
        }));

        return ordersList;
    };

    //method to insert cartitems to db with username.
    const insertCartToDatabase = () => {
        const ordersList = convertCartToDbFormat();
        setCartDb(ordersList);
        setCartItems({});
    };



    //variables and methods that will be accessed in other components using usecontext.
    const contextValue = {
        userName,
        setUserName,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartDb,
        insertCartToDatabase,
        totalPayable
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

