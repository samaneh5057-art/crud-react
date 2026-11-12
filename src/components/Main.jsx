import { useState } from "react";

function Main() {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: "Ahmad",
      lastName: "Ahmadi",
      grade: "10",
      age: 16,
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Mohammadi",
      grade: "11",
      age: 17,
    },
    {
      id: 3,
      firstName: "Ali",
      lastName: "Hosseini",
      grade: "9",
      age: 15,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    age: "",
  });

  // Open form for adding a student
  const openAddForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      grade: "",
      age: "",
    });

    setEditingId(null);
    setShowForm(true);
  };

  // Open form for editing
  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      grade: student.grade,
      age: student.age,
    });

    setEditingId(student.id);
    setShowForm(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add or update student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? { ...student, ...formData }
            : student
        )
      );
    } else {
      const newStudent = {
        id: Date.now(),
        ...formData,
      };

      setStudents([...students, newStudent]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  // Delete student
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmed) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Search students
  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.lastName}`.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      String(student.id).includes(search)
    );
  });

  return (
    <main className="main-content" id="home">
      <section className="intro">
        <div className="intro-text">
          <span className="eyebrow">STUDENT MANAGEMENT SYSTEM</span>

          <h1>
            Manage your students
            <br />
            <span>with simplicity.</span>
          </h1>

          <p>
            Keep student information organized in one simple place.
            Add, update and manage your student records easily.
          </p>
        </div>

        <div className="intro-decoration">
          <div className="decoration-circle">S</div>
        </div>
      </section>

      <section className="students-section" id="students">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RECORDS</span>
            <h2>Students List</h2>
            <p>Manage all your student information here.</p>
          </div>

          <button className="add-button" onClick={openAddForm}>
            <span>＋</span> Add Student
          </button>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="student-count">
            {filteredStudents.length} students
          </span>
        </div>

        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>GRADE</th>
                <th>AGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="id-cell">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="name-cell">
                      {student.firstName}
                    </td>

                    <td>{student.lastName}</td>

                    <td>
                      <span className="grade-badge">
                        Grade {student.grade}
                      </span>
                    </td>

                    <td>{student.age}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Modal */}
      {showForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="student-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">
                  STUDENT INFORMATION
                </span>

                <h2>
                  {editingId !== null
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <p>Enter the student details below.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Grade</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select grade</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  {editingId !== null
                    ? "Save Changes"
                    : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;