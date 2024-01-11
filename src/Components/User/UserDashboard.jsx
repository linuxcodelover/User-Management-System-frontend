import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Token:", token);
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
        setData(res.data.user);
        console.log("Server response:", res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDelete = async (event) => {
    if (
      window.confirm("Are you sure you want to delete your account?") === true
    ) {
      try {
        const token = localStorage.getItem("token");
        // console.log("Token:", token);
        const res = await axios.delete(
          `http://127.0.0.1:4000/api/v1/user/${data._id}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // setData(res.data.user);
        handleLogout();
        console.log("Server response:", res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    } else {
    }
  };

  return (
    <>
      <Navbar title="User Dashboard" />
      <div className="d-flex justify-content-center">
        <div className="col-sm-8">
          <table className="table  mt-5">
            <thead>
              <tr>
                <th>Profile Image</th>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={`http://localhost:4000/${data.profile_image}`}
                    alt="Profile"
                    height="50px"
                  />
                </td>
                {/* <th>{data._id}</th> */}
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={() =>
                      navigate(`/user/edit/${data._id}`, {
                        state: { role: data.role },
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={onDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
