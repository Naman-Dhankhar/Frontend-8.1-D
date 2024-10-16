import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FindQuestionsPage from './components/FindQuestionsPage';
import NewPostPage from './components/NewPostPage'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-questions" element={<FindQuestionsPage />} />
        <Route path="/post" element={<NewPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
