import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Comments from './pages/Comments';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Comments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
