import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BASE_URL } from "./Config";

function Users() {
  //GET ALL USER
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  // DELETE
  const HandleDelete = (id) => {
    // DELETE
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes", proceed with the deletion
        axios
          .delete(`${BASE_URL}/deleteUser/${id}`)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4">
        <Link to="/create" className="btn btn-success  mb-3">
          Add +
        </Link>
        <table className="table">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ fontWeight: 500 }} className="text-primary">
                    {user.age}
                  </td>
                  <td>{user.gender}</td>
                  <td
                    style={{
                      fontWeight: user.status === "Redefense" ? 500 : 500
                    }}
                    className={`${
                      user.status === "Redefense"
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {user.status}
                  </td>

                  <td className="d-grid gap-2 d-md-flex">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => HandleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
