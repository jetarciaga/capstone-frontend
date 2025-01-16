import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import api from "./api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    api
      .get(`api/users/${id}/`)
      .then((response) => {
        console.log(response.data);
        setUserData({
          firstname: response.data.firstname,
          middlename: response.data.profile.middlename,
          lastname: response.data.lastname,
          address: response.data.profile.address,
          civil_status: response.data.profile.civil_status,
          mobile: response.data.profile.mobile,
          email: response.data.email,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const [formData, setFormData] = useState({
    ...userData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await MySwal.fire({
        title: "Update user profile?",
        text: "This will change your data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
      if (result.isConfirmed) {
        const response = await api.patch(`api/users/${id}/`, {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          profile: {
            middlename: formData.middlename,
            civil_status: formData.civil_status,
            address: formData.address,
            mobile: formData.mobile,
          },
        });
        console.log("success", response.data);
        setEditMode((editMode) => !editMode);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      await MySwal.fire(
        "Error",
        "Something went wrong while updating the user",
        "error"
      );
    }
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setEditMode((editMode) => !editMode);
  };

  return (
    <div className="user-profile-app">
      <h1>User Profile</h1>
      <hr />
      <form className="user-container">
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.firstname}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="firstname"
              value={formData.firstname}
              placeholder={userData.firstname}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Name</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.middlename}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="middlename"
              value={formData.middlename}
              placeholder={userData.middlename}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Middle Name</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.lastname}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="lastname"
              value={formData.lastname}
              placeholder={userData.lastname}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Surname</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.civil_status}</span>
          ) : (
            <select
              className="user-info"
              name="civil_status"
              value={formData.civil_status}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="separated">Separated</option>
              <option value="widowed">Widowed</option>
              <option value="in_a_civil_partnership">
                In a civil partnership
              </option>
            </select>
          )}
          <span className="user-label">Civil Status</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.address}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="addess"
              value={formData.address}
              placeholder={userData.address}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Address</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.mobile}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="mobile"
              value={formData.mobile}
              placeholder={userData.mobile}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Mobile Number</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{userData.email}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="email"
              value={formData.email}
              placeholder={userData.email}
              onChange={handleChange}
            />
          )}

          <span className="user-label">Email Address</span>
        </div>
        {!editMode ? (
          <button className="edit" onClick={toggleEdit}>
            <i className="bx bxs-edit" />
            Edit
          </button>
        ) : (
          <button className="submit" onClick={handleSubmit}>
            <i className="bx bx-check" />
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
