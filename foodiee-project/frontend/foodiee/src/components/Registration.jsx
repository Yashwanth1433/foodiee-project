
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import { isEmailOrPhoneExcists, registerUser } from '../services/services';
import { ToastContainer , toast} from 'react-toastify';

const Registration = () => {

    const bgImgStyle = {backgroundImage: "url(/register.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", width: "100vw", height: "100vh", position: "absolute", left: 0, top: 0 };

    //to navigate to components
    const navigate = useNavigate();

    //to check whether the entered email is valid expression
    const validateGmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email) || "Must be a Gmail address";
    };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, //to set errors manually
    clearErrors //to clear a error manually
  } = useForm();

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return true; // Return true if valid
  };

  const onSubmit = async (data) => {
    const { password, confirmpassword } = data;
    const passwordValidation = validatePasswords(password, confirmpassword);

    if (passwordValidation !== true) {
      setError('confirmpassword', {
        type: 'manual',
        message: passwordValidation,
      });
      return; // Prevents the form submission
    }

    clearErrors('confirmpassword');

    const isExcists = await isEmailOrPhoneExcists(data).then((res)=>{return res.data});
    if(isExcists){
      toast.error("Email or phone already exists");
      return;
    }
    registerUser(data);
    toast.success("Registration successfull.");

    setTimeout(() => {
      navigate("/")
    }, 1000);
    
  };

  return (

    <div className='signup' style={bgImgStyle}>
        <ToastContainer />

        <form className='box' onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <div className='inputbox'>
            <input
            className='placeholder-slate-100'
            placeholder='Name'
            {...register("name", { 
                required: "Name is required", 
                minLength: { value: 3, message: "Name must be at least 3 characters" }, 
                maxLength: { value: 20, message: "Name cannot exceed 20 characters" } 
            })}
            />
            {/* to display error */}
            {errors.username && <p>{errors.name.message}</p>}

            <input
            className='placeholder-slate-100'
            placeholder='Email'
            type='email'
            {...register("email", {
                required: "Email is required",
                validate: validateGmail,
            })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
            className='placeholder-slate-100'
            placeholder='Password'
            type='password'
            {...register("password", { 
                required: "Password is required", 
                minLength: { value: 3, message: "Password must be at least 3 characters" } 
            })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
            className='placeholder-slate-100'
            placeholder='Confirm Password'
            type='password'
            {...register("confirmpassword", { 
                required: "Confirm password is required", 
                minLength: { value: 3, message: "Confirm password must be at least 3 characters" } 
            })}
            />
            {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}

            <input
            className='placeholder-slate-100'
            placeholder='Phone Number'
            type='tel'
            {...register("phone", { 
                required: "Phone number is required", 
                minLength: { value: 10, message: "Phone number must be 10 digits" }, 
                maxLength: { value: 10, message: "Phone number must be 10 digits" } 
            })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div className="register-buttons">
          {/* to trigger submit */}
          <input className='signup' type="submit" value="Sign Up" />
          {/* to navigate to signin page */}
          <input onClick={()=>{navigate("/")}} className='signin' type="submit" value="Login in" />   
        </div>
        </form>
    </div>
  );
};

export default Registration;

