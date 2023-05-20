import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  ToastContainer } from "react-toastify";


import UserRoutes from "./routes/UserRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App;
