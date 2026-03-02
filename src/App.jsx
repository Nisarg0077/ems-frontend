// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import './App.css'
// import Home from './components/Home';
// import Login from './controller/auth/Login';
// import NotFound from './components/NotFound';

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//           <Routes >
//             <Route path="/" Component={Home}/>
//             <Route path="/login" Component={Login}/>
//             <Route path="*" Component={NotFound}/>
//           </Routes>    
//       </BrowserRouter>
//     </>
//   )
// }

// export default App



// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./controller/auth/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import './App.css'
import Employee from "./components/employee/employee";
import Department from "./components/department/Department";
import ViewEmpInfo from "./components/employee/ViewEmpInfo";

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