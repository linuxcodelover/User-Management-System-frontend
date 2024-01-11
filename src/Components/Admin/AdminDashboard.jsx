import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:4000/api/v1/admin/dashboard",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setData(res.data.users);
        console.log("Server response:", res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/dashboard",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUser(res.data.user);

        console.log("Server response:", res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDelete = async (userId) => {
    if (
      window.confirm("Are you sure you want to delete this account?") === true
    ) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.delete(
          `http://127.0.0.1:4000/api/v1/admin/users/${userId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (userId === currentUser._id) {
          handleLogout();
        }
        console.log("Server response:", res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    } else {
    }
  };

  return (
    <>
      <Navbar title="Admin Dashboard" />
      <div className="d-flex justify-content-center">
        <div className="col-sm-10">
          <table className="table  mt-5">
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>

                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={`http://localhost:4000/${user.profile_image}`}
                        alt="Profile"
                        height="50px"
                        width="60px"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>

                    <td>
                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          navigate(`/user/edit/${user._id}`, {
                            state: { role: currentUser.role },
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(user._id)}
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
    </>
  );
};

export default AdminDashboard;
