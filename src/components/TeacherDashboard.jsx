import React, { useState } from 'react';
import './TeacherDashboard.css';

const TeacherDashboard = ({ userInfo, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [prevState, setPrevState] = useState(null);

  const getUserInitial = () => {
    return userInfo.username ? userInfo.username.charAt(0).toUpperCase() : 'U';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock teacher data
  const teacherData = {
    department: 'Computer Science',
    position: 'Associate Professor',
    totalStudents: 120,
    totalCourses: 4,
  };

  const courses = [
    { 
      courseCode: 'CS101', 
      courseName: 'Data Structures',
      students: 30,
      schedule: 'Mon, Wed, Fri 10:00 AM'
    },
    { 
      courseCode: 'CS102', 
      courseName: 'Algorithms',
      students: 28,
      schedule: 'Tue, Thu 02:00 PM'
    },
    { 
      courseCode: 'MA101', 
      courseName: 'Discrete Mathematics',
      students: 32,
      schedule: 'Mon, Wed 01:00 PM'
    },
    { 
      courseCode: 'CS103', 
      courseName: 'Web Development',
      students: 30,
      schedule: 'Tue, Thu 03:30 PM'
    },
  ];

  // Mock students data (stores attended and total for attendance calculations)
  const studentsData = {
    'CS101': [
      { rollNo: 'CS001', name: 'John Smith', attended: 28, total: 30, attendance: 93, marksObtained: 85, totalMarks: 100, grade: 'A' },
      { rollNo: 'CS002', name: 'Sarah Johnson', attended: 29, total: 30, attendance: 97, marksObtained: 92, totalMarks: 100, grade: 'A+' },
      { rollNo: 'CS003', name: 'Michael Brown', attended: 23, total: 30, attendance: 77, marksObtained: 72, totalMarks: 100, grade: 'B' },
      { rollNo: 'CS004', name: 'Emily Davis', attended: 26, total: 30, attendance: 87, marksObtained: 88, totalMarks: 100, grade: 'A' },
      { rollNo: 'CS005', name: 'David Wilson', attended: 25, total: 30, attendance: 83, marksObtained: 80, totalMarks: 100, grade: 'B+' },
    ],
    'CS102': [
      { rollNo: 'CS001', name: 'John Smith', attended: 25, total: 28, attendance: 89, marksObtained: 80, totalMarks: 100, grade: 'B+' },
      { rollNo: 'CS006', name: 'Jessica Lee', attended: 26, total: 28, attendance: 93, marksObtained: 89, totalMarks: 100, grade: 'A' },
      { rollNo: 'CS007', name: 'Robert Taylor', attended: 24, total: 28, attendance: 86, marksObtained: 85, totalMarks: 100, grade: 'A' },
      { rollNo: 'CS008', name: 'Amanda Martinez', attended: 26, total: 28, attendance: 93, marksObtained: 91, totalMarks: 100, grade: 'A' },
    ],
    'MA101': [
      { rollNo: 'CS003', name: 'Michael Brown', attended: 24, total: 30, attendance: 80, marksObtained: 75, totalMarks: 100, grade: 'B' },
      { rollNo: 'CS009', name: 'Christopher White', attended: 28, total: 30, attendance: 93, marksObtained: 87, totalMarks: 100, grade: 'A' },
      { rollNo: 'CS010', name: 'Lauren Garcia', attended: 29, total: 30, attendance: 97, marksObtained: 93, totalMarks: 100, grade: 'A+' },
    ],
    'CS103': [
      { rollNo: 'CS004', name: 'Emily Davis', attended: 29, total: 30, attendance: 97, marksObtained: 94, totalMarks: 100, grade: 'A+' },
      { rollNo: 'CS011', name: 'Daniel Rodriguez', attended: 25, total: 28, attendance: 89, marksObtained: 84, totalMarks: 100, grade: 'B+' },
      { rollNo: 'CS012', name: 'Sophia Anderson', attended: 27, total: 28, attendance: 96, marksObtained: 89, totalMarks: 100, grade: 'A' },
    ],
  };

  // keep live state of students so teacher updates persist in UI
  const [studentsMap, setStudentsMap] = React.useState(() => JSON.parse(JSON.stringify(studentsData)));
  const [saveMessage, setSaveMessage] = React.useState('');
  // course-detail temporary inputs
  const [courseDate, setCourseDate] = React.useState(() => new Date().toISOString().slice(0,10));
  const [testName, setTestName] = React.useState('');
  const [testTotalMarks, setTestTotalMarks] = React.useState(100);
  const [tempAttendance, setTempAttendance] = React.useState({});
  const [tempMarks, setTempMarks] = React.useState({});

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

  // helper to compute grade from percentage
  const computeGradeFromPercentage = (pct) => {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    return 'C';
  };

  // Ensure a default course is selected
  React.useEffect(() => {
    if (!selectedCourse && courses.length > 0) {
      setSelectedCourse(courses[0].courseCode);
    }
  }, [courses, selectedCourse]);

  // Handlers for marks and attendance management
  const handleMarksChange = (courseCode, rollNo, value) => {
    setStudentsMap(prev => {
      const next = { ...prev };
      next[courseCode] = next[courseCode].map(s => s.rollNo === rollNo ? { ...s, marksObtained: value } : s);
      return next;
    });
  };

  const handleSaveMark = (courseCode, rollNo) => {
    setStudentsMap(prev => {
      const next = { ...prev };
      next[courseCode] = next[courseCode].map(s => {
        if (s.rollNo === rollNo) {
          const pct = Math.round((s.marksObtained / s.totalMarks) * 100);
          return { ...s, attendance: s.attendance, grade: computeGradeFromPercentage(pct) };
        }
        return s;
      });
      return next;
    });
    setSaveMessage('Marks saved');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleAttendanceStatusChange = (courseCode, rollNo, status) => {
    setStudentsMap(prev => {
      const next = { ...prev };
      next[courseCode] = next[courseCode].map(s => s.rollNo === rollNo ? { ...s, _status: status } : s);
      return next;
    });
  };

  const handleApplyAttendance = (courseCode, rollNo) => {
    setStudentsMap(prev => {
      const next = { ...prev };
      next[courseCode] = next[courseCode].map(s => {
        if (s.rollNo === rollNo) {
          const status = s._status || 'present';
          let attended = s.attended || 0;
          let total = s.total || (s.attended ? s.total : 0) || s.total || (s.attended ? s.total : 0);
          // normalize total
          if (!total) total = attended;
          total = total + 1;
          if (status === 'present') attended = attended + 1;
          const attendance = Math.round((attended / total) * 100);
          return { ...s, attended, total, attendance };
        }
        return s;
      });
      return next;
    });
    setSaveMessage('Attendance updated');
    setTimeout(() => setSaveMessage(''), 1800);
  };

  const renderTimetable = () => (
    <div className="timetable-section">
      <div className="section-title-header">
        <h2>Weekly Timetable</h2>
        <span className="subtitle">Your teaching schedule for the week</span>
      </div>
      <div className="timetable-grid">
        {courses.map(course => (
          <div key={course.courseCode} className="timetable-card">
            <div className="tt-header">
              <div className="tt-code">{course.courseCode}</div>
              <div className="tt-name">{course.courseName}</div>
            </div>
            <div className="tt-body">
              <div className="tt-schedule">{course.schedule}</div>
              <div className="tt-location">Room: {course.room || 'TBD'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const openCourseDetail = (courseCode) => {
    setSelectedCourse(courseCode);
    setActiveSection('courseDetail');
    // initialize temp maps
    const map = {};
    const marksMap = {};
    (studentsMap[courseCode] || []).forEach(s => {
      map[s.rollNo] = false; // unchecked by default
      marksMap[s.rollNo] = s.marksObtained || 0;
    });
    setTempAttendance(map);
    setTempMarks(marksMap);
    setCourseDate(new Date().toISOString().slice(0,10));
    setTestName('');
    setTestTotalMarks(100);
  };

  const toggleExpandCourse = (courseCode) => {
    setExpandedCourse(prev => prev === courseCode ? null : courseCode);
  };

  const goToAttendanceForStudent = (courseCode, rollNo) => {
    // save previous view so we can go back
    setPrevState({ activeSection, selectedCourse, expandedCourse });
    setSelectedCourse(courseCode);
    setActiveSection('attendance');
    // ensure the student has a default _status so the select shows correctly
    setStudentsMap(prev => {
      const next = { ...prev };
      next[courseCode] = next[courseCode].map(s => s.rollNo === rollNo ? { ...s, _status: s._status || 'present' } : s);
      return next;
    });
  };

  const goToMarksForStudent = (courseCode, rollNo) => {
    // save previous view so we can go back
    setPrevState({ activeSection, selectedCourse, expandedCourse });
    setSelectedCourse(courseCode);
    setActiveSection('marks');
    // optionally focus by pre-setting marks input (no-op here)
  };

  const handleBack = () => {
    if (!prevState) return;
    setActiveSection(prevState.activeSection || 'overview');
    setSelectedCourse(prevState.selectedCourse || null);
    setExpandedCourse(prevState.expandedCourse || null);
    setPrevState(null);
  };

  const handleToggleAttendanceTemp = (rollNo) => {
    setTempAttendance(prev => ({ ...prev, [rollNo]: !prev[rollNo] }));
  };

  const handleTempMarkChange = (rollNo, value) => {
    setTempMarks(prev => ({ ...prev, [rollNo]: value }));
  };

  const handleSaveCourseAttendance = () => {
    if (!selectedCourse) return;
    setStudentsMap(prev => {
      const next = { ...prev };
      const list = next[selectedCourse].map(s => {
        const records = s.attendanceRecords ? [...s.attendanceRecords] : [];
        // find existing record for date
        const existing = records.find(r => r.date === courseDate && r.rollNo === s.rollNo);
        const selected = !!tempAttendance[s.rollNo];
        if (!existing) {
          records.push({ date: courseDate, rollNo: s.rollNo, status: selected ? 'present' : 'absent' });
        } else {
          existing.status = selected ? 'present' : 'absent';
        }
        // compute attended & total from records
        const studentRecords = records.filter(r => r.rollNo === s.rollNo);
        const attended = studentRecords.filter(r => r.status === 'present').length;
        const total = studentRecords.length;
        const attendance = total > 0 ? Math.round((attended / total) * 100) : s.attendance || 0;
        return { ...s, attendanceRecords: records, attended, total, attendance };
      });
      next[selectedCourse] = list;
      return next;
    });
    setSaveMessage('Course attendance saved for ' + courseDate);
    setTimeout(() => setSaveMessage(''), 2200);
  };

  const handleSaveCourseMarks = () => {
    if (!selectedCourse) return;
    setStudentsMap(prev => {
      const next = { ...prev };
      next[selectedCourse] = next[selectedCourse].map(s => {
        const marksRecords = s.marksRecords ? [...s.marksRecords] : [];
        const m = Number(tempMarks[s.rollNo] ?? s.marksObtained ?? 0);
        const pct = Math.round((m / testTotalMarks) * 100);
        const grade = computeGradeFromPercentage(pct);
        marksRecords.push({ date: courseDate, testName, marksObtained: m, totalMarks: testTotalMarks, grade });
        // optionally update last test mark and grade
        return { ...s, marksRecords, lastTest: { date: courseDate, testName, marksObtained: m, totalMarks: testTotalMarks, grade } };
      });
      return next;
    });
    setSaveMessage('Marks saved for ' + (testName || 'Test') + ' on ' + courseDate);
    setTimeout(() => setSaveMessage(''), 2200);
  };

  const renderCourseDetail = () => (
    <div className="course-detail">
      <div className="section-title-header">
        <h2>Course: {selectedCourse}</h2>
        <span className="subtitle">Take attendance and record marks</span>
      </div>

      <div className="course-detail-controls">
        <div className="control-item">
          <label>Date</label>
          <input type="date" value={courseDate} onChange={(e) => setCourseDate(e.target.value)} />
        </div>
        <div className="control-item">
          <label>Test Name</label>
          <input type="text" placeholder="Midterm / Quiz 1" value={testName} onChange={(e)=>setTestName(e.target.value)} />
        </div>
        <div className="control-item">
          <label>Total Marks</label>
          <input type="number" value={testTotalMarks} onChange={(e)=>setTestTotalMarks(Number(e.target.value))} />
        </div>
      </div>

      <div className="course-students-table">
        <table className="marks-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student</th>
              <th>Present</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {(studentsMap[selectedCourse] || []).map(s => (
              <tr key={s.rollNo}>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td>
                  <input type="checkbox" checked={!!tempAttendance[s.rollNo]} onChange={()=>handleToggleAttendanceTemp(s.rollNo)} />
                </td>
                <td>
                  <input type="number" className="marks-input" value={tempMarks[s.rollNo] ?? ''} onChange={(e)=>handleTempMarkChange(s.rollNo, Number(e.target.value))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="course-detail-actions">
        <button className="action-btn save" onClick={handleSaveCourseAttendance}>Save Attendance</button>
        <button className="action-btn save" onClick={handleSaveCourseMarks}>Save Marks</button>
        {saveMessage && <span className="save-notice">{saveMessage}</span>}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="teacher-overview">
      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="card-content">
            <div className="card-value">{teacherData.totalStudents}</div>
            <div className="card-label">Total Students</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <i className="fas fa-book-open"></i>
          </div>
          <div className="card-content">
            <div className="card-value">{teacherData.totalCourses}</div>
            <div className="card-label">Courses Teaching</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <div className="card-content">
            <div className="card-value">{teacherData.department}</div>
            <div className="card-label">Department</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="card-content">
            <div className="card-value">{teacherData.position}</div>
            <div className="card-label">Position</div>
          </div>
        </div>
      </div>

      <div className="courses-overview">
        <h3>Your Courses</h3>
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.courseCode}>
              <div className="course-item">
                <div className="course-info">
                  <div className="course-code">{course.courseCode}</div>
                  <div>
                    <div className="course-name">{course.courseName}</div>
                    <div className="course-schedule">{course.schedule}</div>
                  </div>
                </div>
                <div className="course-students" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-users"></i>
                    <span>{(studentsMap[course.courseCode] || []).length} students</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="action-btn" onClick={() => toggleExpandCourse(course.courseCode)}>{expandedCourse === course.courseCode ? 'Hide Students' : 'Show Students'}</button>
                    <button className="action-btn save" onClick={() => openCourseDetail(course.courseCode)}>Open Details</button>
                  </div>
                </div>
              </div>

              {expandedCourse === course.courseCode && (
                <div className="course-students-inline">
                  <table className="attendance-table" style={{ marginTop: 12 }}>
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student</th>
                        <th>Attendance %</th>
                        <th>Marks</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(studentsMap[course.courseCode] || []).map(s => (
                        <tr key={s.rollNo} className="student-inline-row">
                          <td>{s.rollNo}</td>
                          <td>{s.name}</td>
                          <td>
                            <span style={{ color: getAttendanceColor(s.attendance), fontWeight: 700 }}>{s.attendance}%</span>
                          </td>
                          <td>{s.marksObtained}/{s.totalMarks}</td>
                          <td>
                            <button className="inline-action-btn" onClick={() => goToAttendanceForStudent(course.courseCode, s.rollNo)}>Take Attendance</button>
                            <button className="inline-action-btn" onClick={() => goToMarksForStudent(course.courseCode, s.rollNo)}>Give Marks</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarks = () => (
    <div className="marks-management">
      <div className="section-title-header">
        {prevState && <button className="back-btn" onClick={handleBack}>← Back</button>}
        <h2>Manage Student Marks</h2>
        <span className="subtitle">Update and view student marks by course</span>
      </div>

      <div className="course-selector">
        <label>Select Course:</label>
        <select 
          value={selectedCourse || ''} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">-- Choose a course --</option>
          {courses.map((course) => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="marks-table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Marks Obtained</th>
                <th>Total Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsMap[selectedCourse]?.map((student) => {
                const percentage = ((student.marksObtained / student.totalMarks) * 100).toFixed(2);
                return (
                  <tr key={student.rollNo}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>
                      <input 
                        type="number" 
                        value={student.marksObtained}
                        onChange={(e) => handleMarksChange(selectedCourse, student.rollNo, Number(e.target.value))}
                        className="marks-input"
                        min="0"
                        max={student.totalMarks}
                      />
                    </td>
                    <td>{student.totalMarks}</td>
                    <td>{percentage}%</td>
                    <td>
                      <span 
                        className="grade-badge"
                        style={{ backgroundColor: getGradeColor(student.grade) }}
                      >
                        {student.grade}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn save" onClick={() => handleSaveMark(selectedCourse, student.rollNo)}>Save</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-management">
      <div className="section-title-header">
        {prevState && <button className="back-btn" onClick={handleBack}>← Back</button>}
        <h2>Manage Attendance</h2>
        <span className="subtitle">Update student attendance records</span>
      </div>

      <div className="course-selector">
        <label>Select Course:</label>
        <select 
          value={selectedCourse || ''} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">-- Choose a course --</option>
          {courses.map((course) => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Attendance %</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsMap[selectedCourse]?.map((student) => (
                <tr key={student.rollNo}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <div className="attendance-percentage">
                      <span 
                        style={{ color: getAttendanceColor(student.attendance) }}
                      >
                        {student.attendance}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <select className="status-select" value={student._status || 'present'} onChange={(e) => handleAttendanceStatusChange(selectedCourse, student.rollNo, e.target.value)}>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                  <td>
                    <button className="action-btn save" onClick={() => handleApplyAttendance(selectedCourse, student.rollNo)}>Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderStudents = () => (
    <div className="students-management">
      <div className="section-title-header">
        <h2>Students Mapped to You</h2>
        <span className="subtitle">View all students in your courses</span>
      </div>

      <div className="course-selector">
        <label>Filter by Course:</label>
        <select 
          value={selectedCourse || ''} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">-- All Courses --</option>
          {courses.map((course) => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </div>

      <div className="students-cards">
        {(selectedCourse 
          ? studentsMap[selectedCourse] 
          : Object.values(studentsMap).flat()
        )?.map((student) => (
          <div key={student.rollNo} className="student-card">
            <div className="student-header">
              <div className="student-avatar">
                {student.name.charAt(0)}
              </div>
              <div className="student-basic-info">
                <div className="student-name">{student.name}</div>
                <div className="student-roll">{student.rollNo}</div>
              </div>
            </div>
            <div className="student-stats">
              <div className="stat">
                <span className="stat-label">Attendance</span>
                <span 
                  className="stat-value"
                  style={{ color: getAttendanceColor(student.attendance) }}
                >
                  {student.attendance}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Marks</span>
                <span className="stat-value">
                  {student.marksObtained}/{student.totalMarks}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Grade</span>
                <span 
                  className="stat-value grade"
                  style={{ color: getGradeColor(student.grade) }}
                >
                  {student.grade}
                </span>
              </div>
            </div>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div className={`teacher-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
            <div className="user-role">Instructor</div>
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
            <div className="nav-label">Management</div>
            <button 
              className={`nav-item ${activeSection === 'marks' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('marks');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-edit"></i>
              Manage Marks
            </button>
            <button 
              className={`nav-item ${activeSection === 'attendance' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('attendance');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-clipboard-list"></i>
              Manage Attendance
            </button>
            <button 
              className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('students');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-users"></i>
              My Students
            </button>
            <button 
              className={`nav-item ${activeSection === 'timetable' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('timetable');
                setSidebarOpen(false);
              }}
            >
              <i className="fas fa-calendar-alt"></i>
              Timetable
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="teacher-main-content">
        {/* Top Header */}
        <header className="teacher-header">
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
              <span className="current">Faculty Portal</span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="header-btn" title="Notifications">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </button>
              <button className="header-btn" title="Messages">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">2</span>
              </button>
            </div>
            
            <div className="user-menu">
              <div className="user-avatar-small">
                {getUserInitial()}
              </div>
              <div className="user-details">
                <span className="user-name">{userInfo.name}</span>
                <span className="user-role">Instructor</span>
              </div>
              <button className="logout-btn" onClick={onLogout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="teacher-content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="banner-content">
              <h1>{getGreeting()}, {userInfo.name}!</h1>
              <p>Welcome to your faculty dashboard</p>
            </div>
          </div>

          {/* Section Content */}
          <div className="section-content">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'marks' && renderMarks()}
            {activeSection === 'attendance' && renderAttendance()}
            {activeSection === 'students' && renderStudents()}
            {activeSection === 'timetable' && renderTimetable()}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="teacher-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default TeacherDashboard;
