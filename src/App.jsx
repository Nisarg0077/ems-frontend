import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./controller/auth/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import './App.css'
import Employee from "./components/employee/Employee";
import Department from "./components/department/Department";
import ViewEmpInfo from "./components/employee/ViewEmpInfo";
import AddDataForm from "./components/ui/AddDataForm";
import AddEmployeeData from "./components/employee/AddEmployeeData";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected – Layout adds Navbar + Sidebar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employee/>} />
            <Route path="/employee/addemployee" element={<AddEmployeeData/>} />
            <Route path="/emp/:id" element={<ViewEmpInfo/>} />
            <Route path="/department" element={<Department />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;