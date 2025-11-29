import React, { useState } from 'react';
import QuickAccess from './QuickAccess';
import ContentSections from './ContentSections';
import './Dashboard.css';

const Dashboard = ({ userInfo, onLogout }) => {
  const [activeContent, setActiveContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (content) => {
    setActiveContent(content);
    setSidebarOpen(false);
  };

  const handleCloseContent = () => {
    setActiveContent(null);
  };

  const getUserInitial = () => {
    return userInfo.username ? userInfo.username.charAt(0).toUpperCase() : 'U';
  };

  const getUserDetails = () => {
    switch (userInfo.userType) {
      case 'student':
        return `Computer Science • 4th Year`;
      case 'teacher':
        return `Department of Computer Science`;
      case 'admin':
        return `System Administrator`;
      default:
        return `University Portal`;
    }
  };

  const getDashboardTitle = () => {
    switch (userInfo.userType) {
      case 'student': return 'Student Dashboard';
      case 'teacher': return 'Faculty Dashboard';
      case 'admin': return 'Administrator Dashboard';
      default: return 'Dashboard';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const statsData = {
    publications: {
      published: 0,
      submitted: 3,
      inProgress: 0
    },
    events: {
      attended: 0,
      registered: 5,
      upcoming: 0
    }
  };

  return (
    <div className="dashboard-modern">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-university"></i>
            <span>UniPortal</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar-modern">
            {getUserInitial()}
          </div>
          <div className="user-info-sidebar">
            <div className="user-name">{userInfo.name}</div>
            <div className="user-role">{getUserDetails()}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-label">Main</div>
            <button className="nav-item active">
              <i className="fas fa-home"></i>
              Dashboard
            </button>
          </div>
          
          <div className="nav-section">
            <div className="nav-label">Academic</div>
            <button className="nav-item" onClick={() => handleOptionClick('courses')}>
              <i className="fas fa-book-open"></i>
              Courses
            </button>
            <button className="nav-item" onClick={() => handleOptionClick('credits')}>
              <i className="fas fa-chart-line"></i>
              Grades & Progress
            </button>
            <button className="nav-item" onClick={() => handleOptionClick('fees')}>
              <i className="fas fa-credit-card"></i>
              Fee Management
            </button>
          </div>

          <div className="nav-section">
            <div className="nav-label">Research</div>
            <button className="nav-item">
              <i className="fas fa-file-alt"></i>
              Publications
            </button>
            <button className="nav-item">
              <i className="fas fa-calendar-alt"></i>
              Events
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="breadcrumb">
              <span>Dashboard</span>
              <span>/</span>
              <span className="current">{getDashboardTitle()}</span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="header-btn">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </button>
              <button className="header-btn">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">5</span>
              </button>
              <button className="header-btn">
                <i className="fas fa-cog"></i>
              </button>
            </div>
            
            <div className="user-menu">
              <div className="user-avatar-small">
                {getUserInitial()}
              </div>
              <div className="user-details">
                <span className="user-name">{userInfo.name}</span>
                <span className="user-role">{userInfo.userType}</span>
              </div>
              <button className="logout-btn-modern" onClick={onLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content-modern">
          {/* Welcome Section */}
          <div className="welcome-section-modern">
            <div className="welcome-content">
              <h1>{getGreeting()}, {userInfo.name}!</h1>
              <p>Welcome to your personalized dashboard. Here's what's happening today.</p>
              <div className="welcome-stats">
                <div className="welcome-stat">
                  <i className="fas fa-book"></i>
                  <div>
                    <span className="stat-number">3</span>
                    <span className="stat-label">Active Courses</span>
                  </div>
                </div>
                <div className="welcome-stat">
                  <i className="fas fa-tasks"></i>
                  <div>
                    <span className="stat-number">2</span>
                    <span className="stat-label">Pending Tasks</span>
                  </div>
                </div>
                <div className="welcome-stat">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <span className="stat-number">1</span>
                    <span className="stat-label">Upcoming Events</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="welcome-graphic">
              <div className="graphic-circle">
                <i className="fas fa-graduation-cap"></i>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stats-row">
              <div className="stat-card-modern research">
                <div className="stat-header">
                  <h3>Research & Publications</h3>
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="stat-grid">
                  <div className="stat-item">
                    <div className="stat-value">{statsData.publications.published}</div>
                    <div className="stat-label">Published</div>
                    <div className="stat-trend neutral">
                      <i className="fas fa-minus"></i>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value highlight">{statsData.publications.submitted}</div>
                    <div className="stat-label">Submitted</div>
                    <div className="stat-trend positive">
                      <i className="fas fa-arrow-up"></i>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{statsData.publications.inProgress}</div>
                    <div className="stat-label">In Progress</div>
                    <div className="stat-trend neutral">
                      <i className="fas fa-minus"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stat-card-modern events">
                <div className="stat-header">
                  <h3>Academic Events</h3>
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="stat-grid">
                  <div className="stat-item">
                    <div className="stat-value">{statsData.events.attended}</div>
                    <div className="stat-label">Attended</div>
                    <div className="stat-trend neutral">
                      <i className="fas fa-minus"></i>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value highlight">{statsData.events.registered}</div>
                    <div className="stat-label">Registered</div>
                    <div className="stat-trend positive">
                      <i className="fas fa-arrow-up"></i>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{statsData.events.upcoming}</div>
                    <div className="stat-label">Upcoming</div>
                    <div className="stat-trend neutral">
                      <i className="fas fa-minus"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-card-modern academic">
                <div className="stat-header">
                  <h3>Academic Performance</h3>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="performance-content">
                  <div className="gpa-display">
                    <div className="gpa-value">3.75</div>
                    <div className="gpa-label">Current GPA</div>
                  </div>
                  <div className="progress-ring">
                    <div className="ring-chart">
                      <div className="ring-progress" style={{ '--progress': '75%' }}></div>
                      <div className="ring-text">75%</div>
                    </div>
                    <div className="ring-label">Semester Progress</div>
                  </div>
                </div>
              </div>

              <div className="stat-card-modern quick-stats">
                <div className="stat-header">
                  <h3>Quick Overview</h3>
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="quick-stats-grid">
                  <div className="quick-stat">
                    <i className="fas fa-check-circle success"></i>
                    <span>Courses Completed</span>
                    <strong>12</strong>
                  </div>
                  <div className="quick-stat">
                    <i className="fas fa-clock warning"></i>
                    <span>Pending Assignments</span>
                    <strong>3</strong>
                  </div>
                  <div className="quick-stat">
                    <i className="fas fa-exclamation-circle danger"></i>
                    <span>Deadlines This Week</span>
                    <strong>2</strong>
                  </div>
                  <div className="quick-stat">
                    <i className="fas fa-dollar-sign info"></i>
                    <span>Fee Balance</span>
                    <strong>$2,500</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access & Recent Activity */}
          <div className="dashboard-bottom">
            <div className="quick-access-section">
              <div className="section-header">
                <h3>Quick Access</h3>
                <span>Frequently used features</span>
              </div>
              <QuickAccess onOptionClick={handleOptionClick} />
            </div>

            <div className="recent-activity">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <span>Latest updates</span>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="activity-content">
                    <p>Assignment submitted - CS101</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="activity-content">
                    <p>New course material available - MA201</p>
                    <span>5 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon warning">
                    <i className="fas fa-exclamation"></i>
                  </div>
                  <div className="activity-content">
                    <p>Fee payment reminder</p>
                    <span>1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon primary">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <p>New announcement from Dr. Smith</p>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <ContentSections 
          activeContent={activeContent} 
          onCloseContent={handleCloseContent}
          userType={userInfo.userType}
        />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;