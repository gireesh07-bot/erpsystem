import React, { useState, useEffect } from 'react';
import LoginSection from './components/LoginSection';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUserInfo(userData);
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUserInfo(null);
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  // Splash Screen
  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-logo">
            <div className="logo-animation">
              <i className="fas fa-university"></i>
            </div>
            <div className="splash-text">
              <span className="logo-primary">Uni</span>
              <span className="logo-secondary">Portal</span>
            </div>
          </div>
          <div className="splash-subtitle">
            University Management System
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
        
        <div className="splash-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">
            {isLoggedIn ? 'Signing out...' : 'Loading...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Background Elements */}
      <div className="app-background">
        <div className="bg-grid"></div>
        <div className="bg-blur-1"></div>
        <div className="bg-blur-2"></div>
      </div>

      {/* Main Content */}
      <div className="app-container">
        {!isLoggedIn ? (
          <div className="auth-section">
            <LoginSection onLogin={handleLogin} />
          </div>
        ) : (
          <div className="dashboard-section">
            {userInfo.userType === 'student' ? (
              <StudentDashboard userInfo={userInfo} onLogout={handleLogout} />
            ) : userInfo.userType === 'teacher' ? (
              <TeacherDashboard userInfo={userInfo} onLogout={handleLogout} />
            ) : (
              <Dashboard userInfo={userInfo} onLogout={handleLogout} />
            )}
          </div>
        )}
      </div>

      {/* App Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#support">Support</a>
          </div>
          <div className="footer-copyright">
            © 2024 UniPortal. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Notification System */}
      <div className="notification-container" id="notification-container">
        {/* Notifications will be dynamically inserted here */}
      </div>
    </div>
  );
}

export default App;