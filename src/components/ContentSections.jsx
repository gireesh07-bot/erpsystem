import React, { useState } from 'react';
import './ContentSections.css';

const ContentSections = ({ activeContent, onCloseContent, userType }) => {
  const [activeSubContent, setActiveSubContent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const courses = [
    { 
      code: 'CS101', 
      name: 'Introduction to Programming', 
      credits: 3, 
      instructor: 'Dr. Smith',
      schedule: 'Mon/Wed 10:00-11:30',
      enrolled: true,
      grade: 'A-',
      progress: 100
    },
    { 
      code: 'MA201', 
      name: 'Advanced Mathematics', 
      credits: 4, 
      instructor: 'Dr. Johnson',
      schedule: 'Tue/Thu 14:00-15:30',
      enrolled: true,
      grade: 'B+',
      progress: 100
    },
    { 
      code: 'PH301', 
      name: 'Physics Fundamentals', 
      credits: 3, 
      instructor: 'Dr. Williams',
      schedule: 'Mon/Wed/Fri 09:00-10:00',
      enrolled: false,
      grade: null,
      progress: 0
    },
    { 
      code: 'CS202', 
      name: 'Data Structures', 
      credits: 4, 
      instructor: 'Dr. Brown',
      schedule: 'Tue/Thu 11:00-12:30',
      enrolled: false,
      grade: null,
      progress: 0
    },
    { 
      code: 'EN101', 
      name: 'English Composition', 
      credits: 3, 
      instructor: 'Dr. Davis',
      schedule: 'Mon/Wed 13:00-14:30',
      enrolled: false,
      grade: null,
      progress: 0
    },
    { 
      code: 'CS303', 
      name: 'Algorithms', 
      credits: 4, 
      instructor: 'Dr. Miller',
      schedule: 'Tue/Thu 16:00-17:30',
      enrolled: false,
      grade: null,
      progress: 0
    }
  ];

  const enrolledCourses = courses.filter(course => course.enrolled);
  const availableCourses = courses.filter(course => !course.enrolled);

  const handleCourseSelection = (courseCode) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter(code => code !== courseCode));
    } else {
      setSelectedCourses([...selectedCourses, courseCode]);
    }
  };

  const handleSubContentClick = (subContent) => {
    setActiveSubContent(subContent);
    setActiveTab('all');
  };

  const handleBackToMain = () => {
    setActiveSubContent(null);
  };

  const CourseCard = ({ course, showCheckbox = false, showProgress = false }) => (
    <div className={`course-card ${course.enrolled ? 'enrolled' : ''}`}>
      <div className="course-header">
        <div className="course-code">{course.code}</div>
        {course.enrolled && (
          <div className="enrolled-badge">
            <i className="fas fa-check-circle"></i>
            Enrolled
          </div>
        )}
      </div>
      <h4 className="course-title">{course.name}</h4>
      <div className="course-details">
        <div className="detail-item">
          <i className="fas fa-user-graduate"></i>
          <span>{course.instructor}</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-star"></i>
          <span>{course.credits} Credits</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-clock"></i>
          <span>{course.schedule}</span>
        </div>
      </div>
      {showProgress && course.enrolled && (
        <div className="progress-section">
          <div className="progress-info">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {showCheckbox && (
        <label className="course-checkbox">
          <input 
            type="checkbox" 
            checked={selectedCourses.includes(course.code)}
            onChange={() => handleCourseSelection(course.code)}
          />
          <span className="checkmark"></span>
          Select for Registration
        </label>
      )}
    </div>
  );

  const renderCoursesContent = () => (
    <div className="content-modern">
      <div className="content-header-modern">
        <div className="header-left">
          <button className="back-button" onClick={handleBackToMain}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="header-info">
            <h2>Course Management</h2>
            <p>Manage your courses and registration</p>
          </div>
        </div>
        <button className="close-btn-modern" onClick={onCloseContent}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {!activeSubContent ? (
        <div className="dashboard-cards">
          <div className="dashboard-card primary" onClick={() => handleSubContentClick('available-courses')}>
            <div className="card-icon">
              <i className="fas fa-list"></i>
            </div>
            <div className="card-content">
              <h3>Available Courses</h3>
              <p>Browse all available courses</p>
              <div className="card-badge">{availableCourses.length} courses</div>
            </div>
          </div>

          <div className="dashboard-card success" onClick={() => handleSubContentClick('registered-courses')}>
            <div className="card-icon">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <div className="card-content">
              <h3>My Courses</h3>
              <p>View enrolled courses</p>
              <div className="card-badge">{enrolledCourses.length} enrolled</div>
            </div>
          </div>

          <div className="dashboard-card warning" onClick={() => handleSubContentClick('course-registration')}>
            <div className="card-icon">
              <i className="fas fa-edit"></i>
            </div>
            <div className="card-content">
              <h3>Registration</h3>
              <p>Register for new courses</p>
              <div className="card-badge">Open</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-body-modern">
          {activeSubContent === 'available-courses' && (
            <div className="tab-section">
              <div className="section-header">
                <h3>Available Courses - Spring 2024</h3>
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search courses..." />
                </div>
              </div>
              <div className="courses-grid-modern">
                {availableCourses.map(course => (
                  <CourseCard key={course.code} course={course} />
                ))}
              </div>
            </div>
          )}

          {activeSubContent === 'registered-courses' && (
            <div className="tab-section">
              <div className="section-header">
                <h3>My Courses</h3>
                <div className="filter-tabs">
                  <button 
                    className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Courses
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                  >
                    In Progress
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>
              <div className="courses-grid-modern">
                {enrolledCourses.map(course => (
                  <CourseCard key={course.code} course={course} showProgress={true} />
                ))}
              </div>
            </div>
          )}

          {activeSubContent === 'course-registration' && (
            <div className="tab-section">
              <div className="section-header">
                <h3>Course Registration</h3>
                <div className="selected-count">
                  {selectedCourses.length} courses selected
                </div>
              </div>
              
              <div className="registration-info">
                <div className="info-card">
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <strong>Registration Period:</strong> Jan 15 - Feb 15, 2024
                  </div>
                </div>
              </div>

              <div className="courses-selection-grid">
                {availableCourses.map(course => (
                  <CourseCard 
                    key={course.code} 
                    course={course} 
                    showCheckbox={true}
                  />
                ))}
              </div>

              <div className="action-footer">
                <button className="btn-secondary">Clear Selection</button>
                <button className="btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  Register Selected Courses ({selectedCourses.length})
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderCreditsContent = () => (
    <div className="content-modern">
      <div className="content-header-modern">
        <div className="header-info">
          <h2>Academic Progress</h2>
          <p>Track your grades and completion status</p>
        </div>
        <button className="close-btn-modern" onClick={onCloseContent}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="content-body-modern">
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">3.75</div>
              <div className="stat-label">Current GPA</div>
            </div>
          </div>
          
          <div className="stat-card success">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">45</div>
              <div className="stat-label">Credits Completed</div>
            </div>
          </div>
          
          <div className="stat-card warning">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">15</div>
              <div className="stat-label">Current Semester</div>
            </div>
          </div>
          
          <div className="stat-card info">
            <div className="stat-icon">
              <i className="fas fa-flag"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">120</div>
              <div className="stat-label">Total Required</div>
            </div>
          </div>
        </div>

        <div className="progress-section-modern">
          <div className="progress-header">
            <h3>Degree Completion Progress</h3>
            <span className="progress-percent">37.5%</span>
          </div>
          <div className="progress-bar-modern">
            <div className="progress-fill-modern" style={{ width: '37.5%' }}></div>
          </div>
          <div className="progress-stats">
            <span>45 of 120 credits completed</span>
            <span>75 credits remaining</span>
          </div>
        </div>

        <div className="grades-section">
          <h3>Current Semester Performance</h3>
          <div className="grades-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map(course => (
                  <tr key={course.code}>
                    <td className="course-code-cell">{course.code}</td>
                    <td className="course-name-cell">{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <span className={`grade-badge ${course.grade ? 'grade-a' : 'grade-pending'}`}>
                        {course.grade || '--'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${course.progress === 100 ? 'status-completed' : 'status-progress'}`}>
                        {course.progress === 100 ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="mini-progress-bar">
                          <div 
                            className="mini-progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span>{course.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeesContent = () => (
    <div className="content-modern">
      <div className="content-header-modern">
        <div className="header-info">
          <h2>Fee Management</h2>
          <p>View and pay your tuition fees</p>
        </div>
        <button className="close-btn-modern" onClick={onCloseContent}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="content-body-modern">
        <div className="payment-overview">
          <div className="payment-card">
            <div className="payment-header">
              <h3>Current Balance</h3>
              <div className="amount-due">$2,500.00</div>
            </div>
            <div className="payment-details">
              <div className="detail-row">
                <span>Due Date</span>
                <span className="due-date">March 15, 2024</span>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <span className="status-unpaid">Unpaid</span>
              </div>
            </div>
          </div>

          <div className="payment-instructions">
            <h4>Payment Instructions</h4>
            <ul>
              <li>Payments must be made by the due date to avoid late fees</li>
              <li>All major credit cards and bank transfers accepted</li>
              <li>Payment confirmation will be sent to your student email</li>
            </ul>
          </div>
        </div>

        <div className="payment-section">
          <h3>Select Payment Method</h3>
          <div className="payment-methods">
            <div 
              className={`payment-method ${selectedPaymentMethod === 'credit' ? 'selected' : ''}`}
              onClick={() => setSelectedPaymentMethod('credit')}
            >
              <div className="method-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <div className="method-info">
                <div className="method-name">Credit Card</div>
                <div className="method-desc">Visa, MasterCard, American Express</div>
              </div>
              <div className="method-check">
                <i className="fas fa-check"></i>
              </div>
            </div>

            <div 
              className={`payment-method ${selectedPaymentMethod === 'debit' ? 'selected' : ''}`}
              onClick={() => setSelectedPaymentMethod('debit')}
            >
              <div className="method-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <div className="method-info">
                <div className="method-name">Debit Card</div>
                <div className="method-desc">All major debit cards</div>
              </div>
              <div className="method-check">
                <i className="fas fa-check"></i>
              </div>
            </div>

            <div 
              className={`payment-method ${selectedPaymentMethod === 'bank' ? 'selected' : ''}`}
              onClick={() => setSelectedPaymentMethod('bank')}
            >
              <div className="method-icon">
                <i className="fas fa-university"></i>
              </div>
              <div className="method-info">
                <div className="method-name">Bank Transfer</div>
                <div className="method-desc">Direct bank transfer</div>
              </div>
              <div className="method-check">
                <i className="fas fa-check"></i>
              </div>
            </div>
          </div>

          {selectedPaymentMethod && (
            <div className="payment-form-modern">
              <h4>Payment Details</h4>
              <div className="form-grid">
                <div className="form-group-modern">
                  <label>Card Number</label>
                  <div className="input-with-icon">
                    <i className="fas fa-credit-card"></i>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                
                <div className="form-group-modern">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                
                <div className="form-group-modern">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
                
                <div className="form-group-modern full-width">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              </div>
              
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Tuition Fee</span>
                  <span>$2,500.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>$2,500.00</span>
                </div>
              </div>
              
              <button className="btn-pay-now">
                <i className="fas fa-lock"></i>
                Pay $2,500.00
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="content-modern">
      <div className="content-header-modern">
        <div className="header-info">
          <h2>{activeContent ? activeContent.charAt(0).toUpperCase() + activeContent.slice(1) : ''}</h2>
          <p>Management dashboard</p>
        </div>
        <button className="close-btn-modern" onClick={onCloseContent}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="content-body-modern">
        <div className="coming-soon">
          <i className="fas fa-tools"></i>
          <h3>Under Development</h3>
          <p>This section is currently being developed and will be available soon.</p>
        </div>
      </div>
    </div>
  );

  switch (activeContent) {
    case 'courses':
      return renderCoursesContent();
    case 'credits':
      return renderCreditsContent();
    case 'fees':
      return renderFeesContent();
    default:
      return activeContent ? renderDefaultContent() : null;
  }
};

export default ContentSections;