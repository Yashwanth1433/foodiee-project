import './Home.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import FoodMenu from './Fooditems/FoodMenu';
import Footer from './Footer/Footer';


const Home = () => {

  return (
    <>
      {/* Adding all the components */}
      <div className="home-container">
        <Navbar /> 
        <Header />
        <FoodMenu />
        <Footer />
      </div>
        
    </>
  )
}

export default Home