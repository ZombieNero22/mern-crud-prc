import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BASE_URL } from "./Config";

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${BASE_URL}/createUser`, {
        name,
        email,
        age,
        gender,
        status
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User created successfully!"
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already exists!"
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2>Add User</h2>

          <div className="mb-4 mt-4">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="mb-2">
              Age
            </label>
            <input
              type="text"
              id="age"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="mb-2">
              Gender
            </label>
            <select
              id="gender"
              className="form-select"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="mb-2">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Redefense">Redefense</option>
              <option value="Defended">Defended</option>
            </select>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="submit" className="btn btn-success mt-4">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-success mt-4">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
