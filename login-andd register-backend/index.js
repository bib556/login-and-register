import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
const { Schema } = mongoose;
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config({path:"./.env"})
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection successful');
}).catch((err) => {
  console.error('Database connection error:', err);
});

app.get("/",(req,res)=>{
    res.send("the server is running")
})
// schema design
 const userSchema = new Schema({
   name: String,
   email: String,
   password: String,
 })
 
 const User = new mongoose.model("User",userSchema)

 

// Routes 

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.send({ message: "All fields are required" });
    }
  
    try {
      const user = await User.findOne({ email: email });
  
      if (user) {
        if (password === user.password) {
          return res.send({ message: "Login successful", user });
        } else {
          return res.send({ message: "Password didn't match" });
        }
      } else {
        return res.send({ message: "User not registered" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.send({ message: "Internal Server Error" });
    }
  });

// app.post("/login", async (req,res)=>{
//     const {email,password}= req.body
//        let check = await  User.findOne({email:email},(err,user)=>{
//         if(user){
//            if(password === user.password){
//             res.send({message:"login successful",user})
//            }else{
//             res.send({message:"password didnt match"})
//            }
//         }else{
//             res.send("user not registerd ")
//         }
//     })
//     res.send("this is login")
// })


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    console.log("Received request:", req.body); // Log the request body
  
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
  
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        console.log("User already registered:", existingUser); // Log existing user
        return res.status(400).send({ message: "User already registered" });
      }
  
      const user = new User({
        name,
        email,
        password
      });
  
      await user.save();
      console.log("User successfully registered:", user); // Log new user
      res.send({ message: "Successfully registered" });
    } catch (error) {
      console.error("Error during registration:", error); // Log any errors
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  // Co





app.listen(9002,()=>{
    console.log("be started at port 9002")
})
