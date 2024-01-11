import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const EditUser = () => {
  const [formData, setFormData] = useState({ name: "", profile_image: null });
  let { id } = useParams();
  const navigate = useNavigate();
  const navData = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:4000/api/v1/admin/users/${id}/`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setFormData({ name: res.data.users.name, profile_image: null });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "profile_image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("profile_image", formData.profile_image);
      const isAdmin = navData.state.role === "admin";
      await axios.put(
        `http://127.0.0.1:4000/api/v1/${
          isAdmin ? "admin/users/" : "user/edit/"
        }${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  return (
    <div className="container col-sm-6 mt-5">
      <h1 className="text-warning">Edit User</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input
            type="text"
            value={formData.name}
            className="form-control"
            name="name"
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleChange}
            name="profile_image"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
