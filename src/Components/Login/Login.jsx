import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", data);
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container col-sm-3 mt-5">
        <h1 className="text-warning">Login </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              type="password"
              value={formData.password}
              className="form-control"
              name="password"
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-link ml-0 px-0"
            onClick={() => navigate("/register")}
          >
            Don't have an account ? Register.
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
