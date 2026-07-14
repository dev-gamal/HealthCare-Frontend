import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Home from "./pages/Home/Home.jsx";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Files from "./pages/Files";
import About from "./pages/About";

function App() {
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
