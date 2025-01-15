import React, { useState } from "react";
import "./UserProfile.scss";
import api from "./api";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const mockData = {
    firstname: "Jethro",
    middlename: "Gonzaga",
    lastname: "Arciaga",
    address: "212 San Guillermo Street, Putatan Muntinlupa City",
    civil_status: "Married",
    mobile: "+639610059847",
    email: "arciagajethro_bsit@plmun.edu.ph",
  };

  const [formData, setFormData] = useState({
    ...mockData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode((editMode) => !editMode);
    console.log("Sample");
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
            <span className="user-info">{mockData.firstname}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="firstname"
              value={formData.firstname}
              placeholder={mockData.firstname}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Name</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.middlename}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="middlename"
              value={formData.middlename}
              placeholder={mockData.middlename}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Middle Name</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.lastname}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="lastname"
              value={formData.lastname}
              placeholder={mockData.lastname}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Surname</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.civil_status}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="civil_status"
              value={formData.civil_status}
              placeholder={mockData.civil_status}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Civil Status</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.address}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="addess"
              value={formData.address}
              placeholder={mockData.address}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Address</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.mobile}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="mobile"
              value={formData.mobile}
              placeholder={mockData.mobile}
              onChange={handleChange}
            />
          )}
          <span className="user-label">Mobile Number</span>
        </div>
        <div className="user-data">
          {!editMode ? (
            <span className="user-info">{mockData.email}</span>
          ) : (
            <input
              className="user-info"
              type="text"
              name="email"
              value={formData.email}
              placeholder={mockData.email}
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
