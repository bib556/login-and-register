
import './App.css';
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      {/* <Homepage/>
       <Register/>  
      <Login/> */}
     <Router>
     
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  
  </div>
  );
}

export default App;
