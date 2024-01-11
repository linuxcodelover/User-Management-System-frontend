import axios from "axios";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../Admin/AdminDashboard";
import UserDashboard from "../User/UserDashboard";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
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
       
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);
  return !user ? (
    <div className="d-flex min-vh-100 min-vw-100 justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div className="px-2">Loading, Please wait</div>
    </div>
  ) : user.role === "admin" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard />
  );
};

export default Home;
