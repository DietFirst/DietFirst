import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form/Form'; // Import your Form component
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} /> {/* Ensure the path matches */}
            </Routes>
        </Router>
    );
}

export default App;
