import React, { useState } from 'react';
import './LoginSection.css';

const LoginSection = ({ onLogin }) => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [currentCaptcha, setCurrentCaptcha] = useState(generateCaptcha());
  const [isLoading, setIsLoading] = useState(false);

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setCurrentCaptcha(generateCaptcha());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username && password && captcha === currentCaptcha) {
      onLogin({
        username,
        userType,
        name: username === 'admin' ? 'Administrator' : `${userType.charAt(0).toUpperCase() + userType.slice(1)} ${username}`
      });
    } else {
      alert('Please fill all fields correctly and enter the correct CAPTCHA.');
    }
    
    setIsLoading(false);
  };

  const getUsernameLabel = () => {
    switch (userType) {
      case 'student': return 'Student ID';
      case 'teacher': return 'Teacher ID';
      case 'admin': return 'Admin ID';
      default: return 'Student ID';
    }
  };

  const getUsernamePlaceholder = () => {
    switch (userType) {
      case 'student': return 'Enter your student ID';
      case 'teacher': return 'Enter your teacher ID';
      case 'admin': return 'Enter your admin ID';
      default: return 'Enter your ID';
    }
  };

  return (
    <div className="login-container-new">
      <div className="login-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="login-card">
        <div className="card-header">
          <div className="logo-new">
            <div className="logo-icon-new">
              <i className="fas fa-university"></i>
            </div>
            <div className="logo-text-new">
              <span className="logo-primary">Uni</span>
              <span className="logo-secondary">Portal</span>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <div className="user-type-selector">
          <div className="selector-tabs">
            {['student', 'teacher', 'admin'].map((type) => (
              <button
                key={type}
                className={`selector-tab ${userType === type ? 'active' : ''}`}
                onClick={() => setUserType(type)}
              >
                <i className={`fas fa-${type === 'student' ? 'user-graduate' : type === 'teacher' ? 'chalkboard-teacher' : 'user-cog'}`}></i>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-id-card"></i>
            </div>
            <input
              type="text"
              placeholder={getUsernamePlaceholder()}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modern-input"
              required
            />
            <label className="input-label">{getUsernameLabel()}</label>
          </div>

          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-lock"></i>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modern-input"
              required
            />
            <label className="input-label">Password</label>
          </div>

          <div className="captcha-section">
            <label className="captcha-label">Security Verification</label>
            <div className="captcha-group">
              <div className="captcha-display">
                <span className="captcha-text">{currentCaptcha}</span>
                <button 
                  type="button" 
                  className="captcha-refresh-btn"
                  onClick={refreshCaptcha}
                >
                  <i className="fas fa-redo"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter captcha code"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="captcha-input"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>

          <div className="form-footer">
            <a href="#" className="forgot-link">
              <i className="fas fa-key"></i>
              Forgot Password?
            </a>
            <div className="support-link">
              Need help? <a href="#">Contact Support</a>
            </div>
          </div>
        </form>

        <div className="card-footer">
          <div className="security-notice">
            <i className="fas fa-shield-alt"></i>
            Your data is securely encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;