import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form/Form'; 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProgressTracking from './pages/ProgressTracking';


function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/form" element={<Form />} /> {/* Ensure the path matches */}
                <Route path="/progress" element={<ProgressTracking />} />
            </Routes>

        </Router>
    );
}

export default App;
