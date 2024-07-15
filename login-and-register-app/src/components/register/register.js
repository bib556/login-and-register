import React,  {useState} from "react";
 import axios from "axios"
 import "./register.css"
 import { useNavigate } from "react-router-dom";



const Register = () => {

    let navigate = useNavigate();

 let loginRoute =()=>{
    navigate("/login")
 }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && (password === reEnterPassword)) {
      axios.post("http://localhost:9002/register", user)
        .then(res => {
          console.log(res);
          alert("Registration successful");
        })
        .catch(err => {
          console.error(err);
          alert("Registration failed");
        });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register">
      {console.log("user", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter your password"
        onChange={handleChange}
      />
      <div className="button" onClick={register}>Register</div>
      <div>or</div>
      <div className="button"onClick ={loginRoute}>Login</div>
    </div>
  );
};

export default Register;
