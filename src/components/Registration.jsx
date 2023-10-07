import React, { useEffect } from 'react';
import './Register.css';
import { useState } from 'react';
import axios from 'axios'
import Popup from './Popup';
function Registration() {
  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    phone: '',
    email: '',
  });

  const [emailErr, setEmailErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
 const[formErrors,setFormErrors]=useState({})
 

   const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

 const validate=(values)=>{
  const errors={}
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if(!values.Firstname){
    errors.Firstname="Username is reqquired"
  }
  if(!values.Lastname){
    errors.Lastname="Username is reqquired"
  }if(!values.email){
    errors.email="email is reqquired"
  }else if(!regex.test(values.email)){
    errors.email = "This is not a valid email format!";
  }
  if(!values.phone){
    errors.phone="Enter valid phone_no  "
  }
  return errors
}
 
 
useEffect(()=>{
  console.log(formErrors)
  if(Object.keys(formErrors).length===0){
    console.log(formData)
  }
})
  //getting form data  from user

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors(validate(formData))
     
    try {
      const response = await axios.post('https://scholarnestroutes.onrender.com/register', formData);
      console.log(response)
      if (response.status === 200) {
        console.log("register successfully")
        setFormData({
          Firstname: '',
          Lastname: '',
          phone: '',
          email: '',
        });
        setShowPopup(true)
      } else {
        console.log("failed to register")

      }
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className='form-container'>
      <form className='register-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Registration</h2>
        <div className='form-group'>
          <label  >First Name</label>
          <input
             
            placeholder='First Name'
            name='Firstname'
            value={formData.Firstname}
            onChange={handleChange}
          />
          <span className='error'>{formErrors.Firstname}</span>
        </div>
         <div className='form-group'> 
          <label  >Last Name</label>
          <input
             
            value={formData.Lastname}
            placeholder='Last Name'
            name='Lastname'
            onChange={handleChange}

          />
            <span className='error'>{formErrors.Lastname}</span>

        </div>
        <div className='form-group'>
          <label  >Email</label>
          <input
            type='email'
             
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
                    <span className='error'>{formErrors.email}</span>

         </div>

        <div className='form-group'>
          <label  >Phone</label>
          <input
            type='tel'
             
            placeholder='Phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
           <span className='error'>{formErrors.phone}</span>

        </div>
        <button type='submit'  >Register</button>
      </form>
   <Popup show={showPopup} handleClose={()=>setShowPopup(false)}>
   <div>
    <h2>Registration Succesful</h2>
    <p>Thank you for registering</p>
   </div>
   </Popup>
    </div>
  );
}

export default Registration;
