import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Home from "./pages/Home/Home.jsx";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Files from "./pages/Files";
import About from "./pages/About";

import api from './services/api';

function App() {

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Trying to connect to the API...");
        const response = await api.get('/doctor'); 
        console.log("🟢 Success! API response:", response.data);
      } catch (error) {
        console.log("🟡 Connection established, but an error was returned:", error.message);
      }
    };

    testConnection();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route index element={<Home />}></Route>
      <Route path="/patients" element={<Patients />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/appointments" element={<Appointments />}></Route>
      <Route path="/files" element={<Files />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}

export default App;
