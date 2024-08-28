import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';
import { validate } from '../services/services'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Login = () => {

    const bgImgStyle = {backgroundImage: "url(https://www.terrafood.co.in/cdn/shop/files/VegBiryani.jpg?v=1687766592)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", width: "100vw", height: "100vh", position: "absolute", left: 0, top: 0 };

    const navigate = useNavigate();

    const {setUserName} = useContext(StoreContext);

    //These are props of useForm
    const {
        register,   //registers the fields and helps to perform form validation
        handleSubmit,   //handles submit and returns fields and values as objects
        formState : {errors},  //helps to display error message
        clearErrors
    } = useForm();


    //To handle submit
    const onSubmit = async (data)=>{

      clearErrors();   //to clear errors

      const resValue = await validate(data).then((res)=>{return res.data});

      if (resValue === "email") {
        toast.error("Invalid username")
    } else if (resValue === "password") {
        toast.error("Invalid password")
    } else if (resValue === "granted") {

      toast.success("Successfully logged in!");
      setUserName(data.email);
      setTimeout(()=>{
        // Navigate to another page if access is granted
        navigate("/home"); 
      },2000)
        
    }
    }

  return (
    <>
    <ToastContainer />     {/*//to display popup */}
    <div style={bgImgStyle} className="login">


      <form className='box' onSubmit={handleSubmit(onSubmit)}>       
        <h2>Login</h2>
        <div className='inputbox'>
            <input
            className='placeholder-white'
            placeholder='username'
            {...register("email", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must be at least 6 characters",
              }
              
            })}
          />
          {/* error message to display if condition is not met */}
          {errors.email && <p>{errors.email.message}</p>}

          <input
            className='placeholder-slate-100'
            placeholder='password'
            type='password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='sign-buttons bg-slate-50'>
            <input className='signin' type="submit" value="Sign in"/>

            {/* to navigate to register page */}
            <Link className='register' to="/register">Register</Link>    
        </div>
    </form>
    </div>
    </>
  )
}

export default Login