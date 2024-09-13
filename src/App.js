import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import 'bootstrap/dist/css/bootstrap.min.css'
import AcademorsForm from './Components/from/academors';
import { Toaster } from 'react-hot-toast';
import CollegePage from './Components/pages/collegePage';
import Conformation from './Components/from/CampusAmbassador/conformation';
import { UserInterface } from './Components/user_interface/user';
import { MainRegistration } from './Components/outlets/mainRegistration';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<AcademorsForm />} />
          <Route path='/campus_ambassabor/:id' element={<Conformation />} />
          <Route path='/Office' element={<UserInterface />} />
          {/* <Route path='/college_details/:id' element={<CollegePage />} /> */}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
