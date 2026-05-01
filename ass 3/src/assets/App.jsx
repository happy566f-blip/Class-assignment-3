import React, { useState } from "react";

function Header() {
  return (
    <header className="header">
      <h1>Student Scoreboard</h1>
      <p>React Lab Assignment 3</p>
    </header>
  );
}

function StudentRow({ student, updateScore, removeStudent }) {
  const status = student.score >= 40 ? "Pass" : "Fail";
  return (
    <tr>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) => updateScore(student.id, e.target.value)}
        />
      </td>
      <td className={status === "Pass" ? "pass" : "fail"}>{status}</td>
      <td>
        <button className="remove-btn" onClick={() => removeStudent(student.id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

function StudentTable({ students, updateScore, removeStudent }) {
  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              updateScore={updateScore}
              removeStudent={removeStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddStudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || score === "") return alert("Fill all fields");
    addStudent(name, score);
    setName("");
    setScore("");
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter Score"
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul", score: 75 },
    { id: 2, name: "Priya", score: 32 },
    { id: 3, name: "Aman", score: 55 },
  ]);

  const updateScore = (id, newScore) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, score: Number(newScore) } : s)));
  };

  const addStudent = (name, score) => {
    setStudents([...students, { id: Date.now(), name, score: Number(score) }]);
  };

  const removeStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable
        students={students}
        updateScore={updateScore}
        removeStudent={removeStudent}
      />
    </div>
  );
}
