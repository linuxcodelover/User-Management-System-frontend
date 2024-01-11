import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_image" && files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "Application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Server response:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container col-sm-6 mt-5">
      <h1 className="text-warning">Registration form</h1>
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
            type="email"
            value={formData.email}
            className="form-control"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={formData.phone}
            className="form-control"
            name="phone"
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={formData.password}
            className="form-control"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
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
        <div className="row">
          <button
            type="button"
            className="btn btn-link ml-0 px-0 col-sm-5"
            onClick={() => navigate("/login")}
          >
            Already have an account ? Login.
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
