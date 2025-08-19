import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function Form() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initial state
  const initialState = {
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    email: "",
    contact: "",
    department: "",
    job_title: "",
    nationality: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Load employee data if editing
  useEffect(() => {
    if (id) {
      const employeeData = localStorage.getItem(id);
      if (employeeData) {
        setFormData(JSON.parse(employeeData));
      }
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeId = id || Math.floor(Math.random() * 10000);
    const Employee = { ...formData, id: employeeId }; // consistent "id"

    // Save to localStorage
    localStorage.setItem(employeeId, JSON.stringify(Employee));

    // Show toast
    toast.success(id ? "Employee Updated Successfully" : "Form Submitted Successfully", {
      position: "top-center",
    });

    // Reset form
    setFormData(initialState);

    // Navigate back
    setTimeout(() => {
      navigate("/employees");
    }, 1000);
  };

  return (
    <div className="bg-primary min-vh-100 d-flex align-items-center justify-content-center">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div
          className="container p-4"
          style={{
            width: "700px",
            minHeight: "600px",
            borderRadius: "8px",
            backgroundColor: "rgba(100, 153, 180, 0.5)",
            boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="h1 text-dark text-center mb-4">
            {id ? "Edit Employee" : "Enter Employee Details"}
          </div>

          {/* First & Last Name */}
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="first_name" className="form-label">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="last_name" className="form-label">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="form-control"
                
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="age" className="form-label">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-6 pt-2">
              <label className="form-label">Gender:</label>
              <div className="form-check form-check-inline ps-5">
                <input
                  type="radio"
                  id="gender_male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="gender_male" className="form-check-label ">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="gender_female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="gender_female" className="form-check-label">Female</label>
              </div>
            </div>
          </div>

         
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="contact" className="form-label">Contact No.:</label>
              <input
                pattern="\d{11}"    
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          {/* Department & Job Title */}
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="department" className="form-label">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="job_title" className="form-label">Job Title:</label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          {/* Nationality */}
          <div className="mb-3 col-6">
            <label htmlFor="nationality" className="form-label">Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary d-block mx-auto mt-4">
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
