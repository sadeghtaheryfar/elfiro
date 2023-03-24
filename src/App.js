
import Home from "./components/Home";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Order from "./components/Order";
import "./style/style.css";
import { Route,Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/Login"  element={<NoPage/>}/>
        <Route path="/Register"  element={<Register/>}/>
        <Route path="/Dashboard"  element={<Dashboard/>}/>
        <Route path="/orders/:productId" element={<Order/>} />
        <Route path="*"  element={<NoPage/>}/>
      </Routes>
    </div>
  );
}

export default App;