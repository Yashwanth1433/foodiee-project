import { useContext } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = () => {

  const navigate = useNavigate();   //To navigate to pages.

  const {userName} = useContext(StoreContext);    //To get username from login page.

  return (
    <div className="nav-bar">
        <div className="logo">𝒻𝑜𝑜𝒹𝒾𝑒𝑒</div>
        <div className='nav-right'>
          <div onClick={()=>navigate("/home")} className="home">Home</div>
          <div className='user-name'>{userName}</div>
          <div onClick={()=>navigate("/checkout")} className='cart'>Cart <img src="/cart-symbol.png" alt="" width={"30px"} /></div>
          <div onClick={()=>navigate("/")} className="logout">logout <img src="/logout.png" alt="" width={"20px"} /></div>
        </div>
    </div>
  )
}

export default Navbar