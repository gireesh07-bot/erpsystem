import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ userInfo, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getUserInitial = () => {
    return userInfo.username ? userInfo.username.charAt(0).toUpperCase() : 'U';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock student data
  const studentData = {
    rollNumber: 'CS001234',
    department: 'Computer Science',
    semester: '4th Year',
    cgpa: 3.85,
    attendancePercentage: 92,
  };

  const marks = [
    { courseCode: 'CS101', courseName: 'Data Structures', marks: 85, outOf: 100, grade: 'A' },
    { courseCode: 'CS102', courseName: 'Algorithms', marks: 92, outOf: 100, grade: 'A+' },
    { courseCode: 'MA101', courseName: 'Discrete Mathematics', marks: 78, outOf: 100, grade: 'B+' },
    { courseCode: 'CS103', courseName: 'Web Development', marks: 88, outOf: 100, grade: 'A' },
    { courseCode: 'ENG101', courseName: 'Technical Writing', marks: 82, outOf: 100, grade: 'A-' },
  ];

  const attendance = [
    { courseCode: 'CS101', courseName: 'Data Structures', attended: 28, total: 30, percentage: 93 },
    { courseCode: 'CS102', courseName: 'Algorithms', attended: 26, total: 28, percentage: 93 },
    { courseCode: 'MA101', courseName: 'Discrete Mathematics', attended: 25, total: 30, percentage: 83 },
    { courseCode: 'CS103', courseName: 'Web Development', attended: 29, total: 30, percentage: 97 },
    { courseCode: 'ENG101', courseName: 'Technical Writing', attended: 27, total: 30, percentage: 90 },
  ];

  const registeredCourses = [
    { 
      courseCode: 'CS101', 
      courseName: 'Data Structures', 
      instructor: 'Dr. Smith',
      credits: 4,
      schedule: 'Mon, Wed, Fri 10:00 AM',
      room: 'Building A, Room 101'
    },
    { 
      courseCode: 'CS102', 
      courseName: 'Algorithms', 
      instructor: 'Prof. Johnson',
      credits: 3,
      schedule: 'Tue, Thu 02:00 PM',
      room: 'Building B, Room 205'
    },
    { 
      courseCode: 'MA101', 
      courseName: 'Discrete Mathematics', 
      instructor: 'Dr. Williams',
      credits: 4,
      schedule: 'Mon, Wed 01:00 PM',
      room: 'Building A, Room 302'
    },
    { 
      courseCode: 'CS103', 
      courseName: 'Web Development', 
      instructor: 'Mr. Brown',
      credits: 3,
      schedule: 'Tue, Thu 03:30 PM',
      room: 'Building C, Lab 101'
    },
    { 
      courseCode: 'ENG101', 
      courseName: 'Technical Writing', 
      instructor: 'Dr. Garcia',
      credits: 2,
      schedule: 'Fri 11:00 AM',
      room: 'Building A, Room 205'
    },
  ];

  useEffect(() => {
    if (!selectedSubject && registeredCourses.length > 0) {
      setSelectedSubject(registeredCourses[0].courseCode);
    }
  }, [registeredCourses, selectedSubject]);

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return '#48bb78';
      case 'A-':
      case 'B+':
        return '#ed8936';
      case 'B':
        return '#ecc94b';
      case 'B-':
      case 'C+':
        return '#f6ad55';
      default:
        return '#fc8181';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#48bb78';
    if (percentage >= 75) return '#ed8936';
    return '#fc8181';
  };

  const renderOverview = () => (
    <div className="student-overview">
      <div className="student-header-info">
        <div className="student-card">
          <div className="info-row">
            <span className="label">Roll Number</span>
            <span className="value">{studentData.rollNumber}</span>
          </div>
          <div className="info-row">
            <span className="label">Department</span>
            <span className="value">{studentData.department}</span>
          </div>
          <div className="info-row">
            <span className="label">Semester</span>
            <span className="value">{studentData.semester}</span>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-box cgpa">
            <div className="stat-label">Current CGPA</div>
            <div className="stat-value">{studentData.cgpa}</div>
            <div className="stat-subtitle">out of 4.0</div>
          </div>
          <div className="stat-box attendance">
            <div className="stat-label">Overall Attendance</div>
            <div className="stat-value">{studentData.attendancePercentage}%</div>
            <div className="stat-subtitle">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarks = () => (
    <div className="marks-section">
      <div className="section-title-header">
        <h2>Academic Marks</h2>
        <span className="subtitle">Your course scores and grades</span>
      </div>

      <div className="course-selector" style={{ marginBottom: 16 }}>
        <label>Select Subject:</label>
        <select
          className="subject-select"
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {registeredCourses.map((c) => (
            <option key={c.courseCode} value={c.courseCode}>
              {c.courseCode} - {c.courseName}
            </option>
          ))}
        </select>
      </div>

      <div className="marks-table-container">
        <table className="marks-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Marks</th>
              <th>Out Of</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.filter(m => !selectedSubject || m.courseCode === selectedSubject).map((mark) => (
              <tr key={mark.courseCode}>
                <td>{mark.courseCode}</td>
                <td>{mark.courseName}</td>
                <td>{mark.marks}</td>
                <td>{mark.outOf}</td>
                <td>
                  <span 
                    className="grade-badge"
                    style={{ backgroundColor: getGradeColor(mark.grade) }}
                  >
                    {mark.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <div className="section-title-header">
        <h2>Attendance</h2>
        <span className="subtitle">Your course attendance records</span>
      </div>

      <div className="course-selector" style={{ marginBottom: 16 }}>
        <label>Select Subject:</label>
        <select
          className="subject-select"
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {registeredCourses.map((c) => (
            <option key={c.courseCode} value={c.courseCode}>
              {c.courseCode} - {c.courseName}
            </option>
          ))}
        </select>
      </div>

      <div className="attendance-cards">
        {attendance.filter(a => !selectedSubject || a.courseCode === selectedSubject).map((item) => (
          <div key={item.courseCode} className="attendance-card">
            <div className="attendance-header">
              <div>
                <div className="course-code">{item.courseCode}</div>
                <div className="course-name">{item.courseName}</div>
              </div>
              <div 
                className="percentage-badge"
                style={{ color: getAttendanceColor(item.percentage) }}
              >
                {item.percentage}%
              </div>
            </div>
            <div className="attendance-details">
              <span>Classes Attended: <strong>{item.attended}</strong></span>
              <span>Total Classes: <strong>{item.total}</strong></span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: getAttendanceColor(item.percentage)
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="courses-section">
      <div className="section-title-header">
        <h2>Registered Courses</h2>
        <span className="subtitle">Your enrolled courses this semester</span>
      </div>
      <div className="courses-grid">
        {registeredCourses.map((course) => (
          <div key={course.courseCode} className="course-card">
            <div className="course-header">
              <div className="course-code-badge">{course.courseCode}</div>
              <span className="credits">{course.credits} Credits</span>
            </div>
            <h3 className="course-title">{course.courseName}</h3>
            <div className="course-details">
              <div className="detail-item">
                <i className="fas fa-user-tie"></i>
                <span>{course.instructor}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-calendar"></i>
                <span>{course.schedule}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{course.room}</span>
              </div>
            </div>
            <button className="view-course-btn">View Course Details</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className={`student-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
          <div className="user-avatar">
            {getUserInitial()}
          </div>
          <div className="user-info">
            <div className="user-name">{userInfo.name}</div>
            <div className="user-role">Student</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-label">Dashboard</div>
            <button 
              className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('overview');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-th-large"></i>
              Overview
            </button>
          </div>
          
          <div className="nav-section">
            <div className="nav-label">Academic</div>
            <button 
              className={`nav-item ${activeSection === 'marks' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('marks');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-award"></i>
              Marks
            </button>
            <button 
              className={`nav-item ${activeSection === 'attendance' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('attendance');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-clipboard-check"></i>
              Attendance
            </button>
            <button 
              className={`nav-item ${activeSection === 'courses' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('courses');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-book-open"></i>
              Courses
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="student-main-content">
        {/* Top Header */}
        <header className="student-header">
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
              <span className="current">Student Portal</span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="header-btn" title="Notifications">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">2</span>
              </button>
              <button className="header-btn" title="Messages">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">5</span>
              </button>
            </div>
            
            <div className="user-menu">
              <div className="user-avatar-small">
                {getUserInitial()}
              </div>
              <div className="user-details">
                <span className="user-name">{userInfo.name}</span>
                <span className="user-role">Student</span>
              </div>
              <button className="logout-btn" onClick={onLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="student-content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="banner-content">
              <h1>{getGreeting()}, {userInfo.name}!</h1>
              <p>Welcome to your personalized student dashboard</p>
            </div>
          </div>

          {/* Section Content */}
          <div className="student-quick-actions">
            <button
              className={`quick-action ${activeSection === 'marks' ? 'active' : ''}`}
              onClick={() => setActiveSection('marks')}
            >
              <i className="fas fa-award"></i>
              Marks
            </button>
            <button
              className={`quick-action ${activeSection === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveSection('attendance')}
            >
              <i className="fas fa-clipboard-check"></i>
              Attendance
            </button>
            <button
              className={`quick-action ${activeSection === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveSection('courses')}
            >
              <i className="fas fa-book-open"></i>
              Courses
            </button>
          </div>

          <div className="section-content">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'marks' && renderMarks()}
            {activeSection === 'attendance' && renderAttendance()}
            {activeSection === 'courses' && renderCourses()}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="student-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default StudentDashboard;
