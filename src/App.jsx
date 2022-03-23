import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './screens/NavBar';
import Student from './screens/Student';
import Listing from './screens/Listing';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path='/' element={<Student />} />
                <Route path='/add' element={<Listing />} />
            </Routes>
        </Router>
    );
}

export default App;