import React from 'react';
import './QuickAccess.css';

const QuickAccess = ({ onOptionClick }) => {
  const options = [
    { 
      id: 'courses', 
      icon: 'fas fa-book', 
      label: 'Courses',
      description: 'Manage your courses and registration',
      color: 'primary',
      badge: '3'
    },
    { 
      id: 'credits', 
      icon: 'fas fa-graduation-cap', 
      label: 'Credits & Grades',
      description: 'View academic progress and grades',
      color: 'success',
      badge: 'Updated'
    },
    { 
      id: 'counselling', 
      icon: 'fas fa-comments', 
      label: 'Counselling',
      description: 'Student support and guidance',
      color: 'info'
    },
    { 
      id: 'clubs', 
      icon: 'fas fa-users', 
      label: 'Clubs & Activities',
      description: 'Extracurricular activities',
      color: 'warning',
      badge: '5'
    },
    { 
      id: 'exam', 
      icon: 'fas fa-file-alt', 
      label: 'Exam Section',
      description: 'Exams and schedules',
      color: 'danger',
      badge: '2'
    },
    { 
      id: 'fees', 
      icon: 'fas fa-credit-card', 
      label: 'Fee Payments',
      description: 'Manage tuition and payments',
      color: 'primary',
      badge: 'Due'
    },
    { 
      id: 'hostel', 
      icon: 'fas fa-building', 
      label: 'Hostel',
      description: 'Accommodation services',
      color: 'success'
    },
    { 
      id: 'hallticket', 
      icon: 'fas fa-ticket-alt', 
      label: 'Hall Ticket',
      description: 'Download exam hall tickets',
      color: 'warning',
      badge: 'New'
    },
    { 
      id: 'library', 
      icon: 'fas fa-book-open', 
      label: 'Library',
      description: 'Digital library resources',
      color: 'info',
      badge: '12'
    },
    { 
      id: 'profile', 
      icon: 'fas fa-user', 
      label: 'Profile',
      description: 'Personal information',
      color: 'primary'
    },
    { 
      id: 'research', 
      icon: 'fas fa-flask', 
      label: 'Research',
      description: 'Research papers and projects',
      color: 'success',
      badge: '3'
    },
    { 
      id: 'attendance', 
      icon: 'fas fa-calendar-check', 
      label: 'Attendance',
      description: 'Attendance records',
      color: 'danger',
      badge: '85%'
    }
  ];

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'quick-access-primary',
      success: 'quick-access-success',
      warning: 'quick-access-warning',
      danger: 'quick-access-danger',
      info: 'quick-access-info'
    };
    return colorMap[color] || 'quick-access-primary';
  };

  return (
    <div className="quick-access-modern">
      <div className="quick-access-header">
        <div className="header-content">
          <h2>Quick Access</h2>
          <p>Frequently used features and tools</p>
        </div>
        <div className="header-actions">
          <button className="view-all-btn">
            View All
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="quick-access-grid">
        {options.map(option => (
          <div 
            key={option.id}
            className={`quick-access-card ${getColorClass(option.color)}`}
            onClick={() => onOptionClick(option.id)}
          >
            <div className="card-header">
              <div className="card-icon">
                <i className={option.icon}></i>
              </div>
              {option.badge && (
                <div className="card-badge">
                  {option.badge}
                </div>
              )}
            </div>
            
            <div className="card-content">
              <h3 className="card-title">{option.label}</h3>
              <p className="card-description">{option.description}</p>
            </div>

            <div className="card-footer">
              <div className="access-indicator">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="card-hover-effect"></div>
          </div>
        ))}
      </div>

      <div className="quick-access-mobile">
        <div className="mobile-scroll-container">
          {options.map(option => (
            <button
              key={option.id}
              className={`mobile-option ${getColorClass(option.color)}`}
              onClick={() => onOptionClick(option.id)}
            >
              <div className="mobile-icon">
                <i className={option.icon}></i>
              </div>
              <span className="mobile-label">{option.label}</span>
              {option.badge && (
                <span className="mobile-badge">{option.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;