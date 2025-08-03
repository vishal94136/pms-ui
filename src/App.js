import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';
import Dashboard from './Dashboard.js';
import GoalSetting from './components/GoalSetting/GoalSetting.js';
import AnnualAssessment from './components/AnnualAssessment/AnnualAssessment';
import MyPerformance from './components/MyPerformance/MyPerformance.js';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="team/annual-assessment" element={<AnnualAssessment />} />
          <Route path="team/goals-setting" element={<GoalSetting />} />
          <Route path="my-performance" element={<MyPerformance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;