
import Home from "./components/Home";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Order from "./components/Order";
import "./style/style.css";
import DashOrder from "./components/DashOrder";
import DashProfile from "./components/DashProfile";
import DashSupport from "./components/DashSupport";
import DashTransaction from "./components/DashTransaction";
import DashAccount from "./components/DashAccount";
import { Route,Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/Register"  element={<Register/>}/>
        <Route path="/Dashboard"  element={<Dashboard/>}/>
        <Route path="/Dashboard/DashOrder"  element={<DashOrder/>}/>
        <Route path="/Dashboard/DashProfile"  element={<DashProfile/>}/>
        <Route path="/Dashboard/DashSupport"  element={<DashSupport/>}/>
        <Route path="/Dashboard/DashTransaction"  element={<DashTransaction/>}/>
        <Route path="/Dashboard/DashAccount"  element={<DashAccount/>}/>
        <Route path="/orders/:productId" element={<Order/>} />
        <Route path="*"  element={<NoPage/>}/>
      </Routes>
    </div>
  );
}

export default App;