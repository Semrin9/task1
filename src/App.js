import './App.css';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import {Home, Invite, Screening, JobDetails, ScreeningProcess} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/notFound';
import { JobProvider } from './context/job_context'; 
import { UserProvider } from './context/user_context';

function App() {
  return (
    <JobProvider>
    <UserProvider>
    <BrowserRouter>
      <Routes>
      <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path='/job/:id/invite' element={<Invite />} />
        <Route path='/job/:id/screening' element={<Screening />} />
        <Route path='/job/:id/screening/screening-process' element={<ScreeningProcess />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={5000} />
    </UserProvider>
    </JobProvider>
  );
}

export default App;
