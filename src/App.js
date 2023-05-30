
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
import DashOrderAccepted from "./components/DashOrderAccepted";
import DashOrderComing from "./components/DashOrderComing";
import DashOrderFailed from "./components/DashOrderFailed";
import DashOrderSold from "./components/DashOrderSold";
import DashSupportAd from "./components/DashSupportAd";
import DashProfileAuth from "./components/DashProfileAuth";
import OrderAdd from "./components/OrderAdd";
import Transactions from "./components/Transactions";
import Chat from "./components/Chat";
import Rules from "./components/Rules";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Tickets from "./components/Tickets";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/Search"  element={<Search/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/Register"  element={<Register/>}/>
        <Route path="/Dashboard"  element={<Dashboard/>}/>
        <Route path="/Dashboard/Order"  element={<DashOrder/>}/>
        <Route path="Order/add"  element={<OrderAdd/>}/>
        <Route path="/Dashboard/Order/Accepted"  element={<DashOrderAccepted/>}/>
        <Route path="/Dashboard/Order/Coming"  element={<DashOrderComing/>}/>
        <Route path="/Dashboard/Order/Failed"  element={<DashOrderFailed/>}/>
        <Route path="/Dashboard/Order/Sold"  element={<DashOrderSold/>}/>
        <Route path="/Dashboard/Profile"  element={<DashProfile/>}/>
        <Route path="/Dashboard/Profile/Authentication"  element={<DashProfileAuth/>}/>
        <Route path="/Dashboard/Support"  element={<DashSupport/>}/>
        <Route path="/Dashboard/Support/ad"  element={<DashSupportAd/>}/>
        <Route path="/Dashboard/Transaction"  element={<DashTransaction/>}/>
        <Route path="/Dashboard/Account"  element={<DashAccount/>}/>
        <Route path="/chats"  element={<Chat/>}/>
        <Route path="/Rules"  element={<Rules/>}/>
        <Route path="/orders/:productId" element={<Order/>} />
        <Route path="/users/:username" element={<Profile/>} />
        <Route path="/transactions/:productId" element={<Transactions/>} />
        <Route path="/tickets/:TicketId" element={<Tickets/>} />
        <Route path="*"  element={<NoPage/>}/>
      </Routes>
    </div>
  );
}

export default App;