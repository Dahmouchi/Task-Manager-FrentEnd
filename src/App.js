import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./service/PrivateRoute"
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Tasks from "./pages/dashboard/Tasks"
import DashboardLayout from './layouts/DashboardLayouts';
import Home from './pages/Home';
import Projects from './pages/dashboard/Projects';
import SignUp from './pages/SignUp';
import AddProject from './pages/dashboard/AddProject';
import ModifyProject from './pages/dashboard/ModifyProject';
const App = () => {
  return (
    <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      {/* Private Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <DashboardLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/tasks" element={<Tasks/>} />
              <Route path="/dashboard/tasks/:id" element={<ModifyProject/>} />
              <Route path="/dashboard/addProject" element={<AddProject/>} />
              <Route path="/dashboard/projects" element={<Projects/>} />
              <Route path="/dashboard/settings" element={<div>Settings Page</div>} />
            </Routes>
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
};

export default App;
