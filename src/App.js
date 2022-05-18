import "./App.css";
import SignUp from "./components/SignUp";
import {
  Route,
  Routes
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import ProtectedRoute from './components/ProtectedRoute.js'
function App() {

  return (
    <div>
        <Routes>
        <Route exact path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        </Routes>       
    </div>
  );
}

export default App;
