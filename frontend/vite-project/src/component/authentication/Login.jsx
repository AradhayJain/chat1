import React, { useEffect } from 'react'
import "/src/css/sign.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// import { ChatState } from '../../provider/ChatProvider';




const Login = () => {

  const [email, setemail] = React.useState()
  const [password, setpassword] = React.useState()
  const NavigateTo=useNavigate();
  // const {setUser}= ChatState()

  const SubmitHandler=async ()=>{
    if(!email || !password){
      // toast('Please fill all the fields')
      return;
    }
    console.log(email, password);
    try{
      const config={
        method:"post",
        headers:{
          "Content-Type":"application/json"
        }
      }
      const {data}=await axios.post("/api/user/login",{email,password},config);

  
  

      localStorage.setItem("userInfo",JSON.stringify(data))
      NavigateTo("/chats")
      

      
  
        

    }
    catch(err){
      toast("login failed")
      return;
    }
      
  }
  return (
    <div className="form">
      <div className='fm'>
        
        <label>Email:
          <input  onChange={(e)=>setemail(e.target.value)} type="email" name="email" placeholder="Enter your email"/>
        </label>
        <br/>
        <label>Password:
          <input  onChange={(e)=>setpassword(e.target.value)} type="password" name="password" placeholder="Enter your password"/>
        </label>
        <br/>
        {/* <ToastContainer/> */}
        
        
        <button onClick={SubmitHandler} className="b" type="submit">login</button>
      </div>
    </div>
  )
}

export default Login