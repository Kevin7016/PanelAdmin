import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../modules/login/Login";
import Registro from "../modules/registro/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Protect from "../modules/protect/Protect";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protect invert={false}/>}>
          <Route index element={<Login/>} />
        </Route>
        <Route path="/register" element={<Registro/>} />
        <Route path="/dashboard" element={<Protect invert={true}/>}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
