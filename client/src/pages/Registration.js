import React, { useState } from "react";
import loginphoto from "../assets/login photo.png";
import "./registration.css";
import axios from "axios";

const Registration = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  axios.defaults.withCredentials = true;

  const handleButtonClick = (slotId, e) => {
    e.stopPropagation();
    setSelectedSlot(slotId);
    setShowForm(true);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
    name: "",
    age: "",
    sex: "",
    slot: "",
    month: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormData({ ...formData, slot: selectedSlot });
    const updatedFormData = { ...formData, slot: selectedSlot };
    const isValid = validateForm();

    if (isValid) {
      // Add logic for form submission if validation passes
      // For now, just displaying a payment message
      setPaymentMessage("Payment done! See you in the class");
    }

    //send data to register
    try {
      const response = await axios
        .post(
          "https://yoga-class-website-ten.vercel.app/api/users/signup",
          updatedFormData
        )
        .then((response) => {
          console.log("Response:", response.data);
        });
      const { sucess, message } = response.data;
      if (sucess) {
        console.log("registerd successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: "",
      sex: "",
      slot: "",
      month: "",
    });
    // setSelectedSlot(null);
    // setShowForm(false);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      newErrors.email = "Invalid email address";
    }

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate age
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 18 || age > 65) {
      newErrors.age = "Age must be between 18 and 65";
    }

    // Set errors in state
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="main-container">
      <div className="reg-left">
        <img src={loginphoto} alt="loginphoto" className="login-photo" />
      </div>
      <div className="reg-right">
        <div className="button-form-div">
          <div className="heading-top-buttons">
            <h2>
              We have currently 4 classes running. Montly fees are $500.
              timmings are
            </h2>
          </div>

          {!showForm && (
            <div className="button-container">
              <div
                onClick={(e) => handleButtonClick(0, e)}
                className="custom-button"
              >
                6 - 7 AM
              </div>
              <div
                onClick={(e) => handleButtonClick(1, e)}
                className="custom-button"
              >
                7 - 8 AM
              </div>
              <div
                onClick={(e) => handleButtonClick(2, e)}
                className="custom-button"
              >
                8 - 9 AM
              </div>
              <div
                onClick={(e) => handleButtonClick(3, e)}
                className="custom-button"
              >
                5 - 6 PM
              </div>
            </div>
          )}

          {showForm && (
            <div>
              <div
                style={{
                  backgroundColor: "#89C2F7",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "auto",
                  margin: "auto",
                  textAlign: "left",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Email<span style={{ color: "red" }}>*</span>:
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: "90%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          // marginBottom: "10px",
                        }}
                      />
                    </label>
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label>
                      Password<span style={{ color: "red" }}>*</span>:
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                          width: "80%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      Confirm Password<span style={{ color: "red" }}>*</span>:
                      <input
                        type="password"
                        name="confirmPassword"
                        // value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{
                          width: "70%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                    {errors.confirmPassword && (
                      <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div>
                    <label>
                      Name<span style={{ color: "red" }}>*</span>:
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: "80%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Age<span style={{ color: "red" }}>*</span>:
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        style={{
                          width: "80%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                    {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
                  </div>
                  <div>
                    <label>
                      Sex<span style={{ color: "red" }}>*</span>:
                      <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        style={{
                          width: "80%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="dontSay">Don't Want to Say</option>
                      </select>
                    </label>
                    {errors.sex && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          margin: "5px 0 0 0",
                        }}
                      >
                        {errors.sex}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>
                      Month<span style={{ color: "red" }}>*</span>:
                      <select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        style={{
                          width: "80%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </label>
                    {errors.month && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          margin: "5px 0 0 0",
                        }}
                      >
                        {errors.month}
                      </p>
                    )}
                  </div>

                  <div className="button-payment">
                    <button
                      type="submit"
                      style={{
                        width: "80%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginTop: "10px",
                        textAlign: "center",
                        backgroundColor: "#89C2F7",
                      }}
                    >
                      Make Payments
                    </button>
                    {paymentMessage && (
                      <p style={{ color: "green", marginTop: "10px" }}>
                        {paymentMessage}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
