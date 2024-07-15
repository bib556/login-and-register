import React , {useState} from "react";
 import "./login.css"
 import axios from "axios"
 import { useNavigate } from "react-router-dom";

 const Login =()=>{
  let navigate = useNavigate();

 let registerRoute =()=>{
    navigate("/register")
 }
  
    const [user, setUser]= useState({
         email:"",
        password:""
    })


    const handleChange=(e)=>{
        const{name,value} = e.target;
       setUser({
        ...user,
        [name]: value
       })
    }

    const login = ()=>{
         axios.post("http://localhost:9002/login",user)
      .then(res=>{ alert(res.data.message) });
    }
   

    return (
        <div className="login">
            {console.log(user)}
            <h1>login</h1>
      <input type = "email" name ="email"  value={user.email}  placeholder = "enter your email" onChange = {handleChange}></input>
      <input type = "password" name ="password"  value={user.password} placeholder = "enter your password"onChange = {handleChange}></input>
      <div className="button" onClick = {login}>Login</div>
      <div>or</div>
      <div className="button" onClick = {registerRoute}>Register</div>
        </div>
    )
 }

 export default Login