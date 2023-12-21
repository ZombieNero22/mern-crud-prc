import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BASE_URL } from "./Config";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      //.get("http://localhost:3001/getUser/" + id)
      .get(`${BASE_URL}/getUser/` + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setGender(result.data.gender);
        setStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = async (e) => {
    e.preventDefault();

    // Show a confirmation dialog using SweetAlert
    const confirmationResult = await Swal.fire({
      icon: "question",
      title: "Update User",
      text: "Are you sure you want to update this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel"
    });

    // Check if the user confirmed the update
    if (confirmationResult.isConfirmed) {
      try {
        const result = await axios.put(`${BASE_URL}/updateUser/${id}`, {
          name,
          email,
          age,
          gender,
          status
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User updated successfully!"
        });
        navigate("/");
      } catch (error) {
        if (
          error.response &&
          error.response.data.error === "Email already exists for another user"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already exists for another user!"
          });
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-4 mt-4">
            <label htmlFor="" className="mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2">
              Email
            </label>
            <input
              type="Email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2">
              Age
            </label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
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
              value={gender}
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
              value={status}
              required
            >
              <option value="">Select Status</option>
              <option value="Redefense">Redefense</option>
              <option value="Defended">Defended</option>
            </select>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="submit" className="btn btn-primary mt-4">
              Update
            </button>
            <Link to="/" className="btn btn-outline-primary mt-4">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateUser;
