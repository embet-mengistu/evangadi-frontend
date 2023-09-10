import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./signup.css";
///////////////
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import About from "./About";
// //////////////////
function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  // ///we need to target the values on change(when somone is typing) and update in form which has been declared
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // /////when the from is bieng summited
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      // ////posts it from the information gotten from form(its signinup)
      await axios.post("http://localhost:3000/api/users", form);

      // ////exactly after they sign in make them login  by taking thier email and password from the form and give them token(The server will validate the user's credentials and respond with an authentication token and user data.)
      const loginRes = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      // then when its succesfull we extracts the authentication token and user data from the response (loginRes.data.token and loginRes.data.user) and sets it in the React component's globally declarred state using the setUserData function.(we excract it so that we can have acces to there info in any component or page bc setUserData globally declared in usercontext.js)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      // it saves the authentication token in the browser's localStorage so that the user remains authenticated even after a page refresh or navigation.
      localStorage.setItem("auth-token", loginRes.data.token);
      // once logged in it takes as to home page
      navigate("/");
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="sign_flex">
        <div className="signin_box ">
          <h6 className="signin_description">Join the Network</h6>
          <div className="signin_description2">
            Already have an account ?{" "}
            <Link to="/login" style={{ color: "#FE8303" }}>
              Sign in
            </Link>
          </div>
          <form onSubmit={handleSumbit}>
            <div className="email_input">
              <Col sm="12" md="12" lg="12" xl="12">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </Col>
            </div>
            <br />
            <div className="fNandLN">
              <div>
                <Col sm="12" md="12" lg="12" xl="12">
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <br />
              <div>
                <Col sm="12" md="12" lg="12" xl="12">
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </Col>
              </div>
            </div>
            <br />
            <div>
              <Col sm="12" md="12" lg="12" xl="12">
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  onChange={handleChange}
                />
              </Col>
            </div>
            <br />
            <div>
              <Col sm="12" md="12" lg="12" xl="12">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Col>
            </div>
            <div style={{ paddingTop: "15px", fontSize: "15px" }}>
              I agree to the{" "}
              <Link to="#" style={{ color: "#FE8303" }}>
                privacy policy{" "}
              </Link>
              and{" "}
              <Link to="/#" style={{ color: "#FE8303" }}>
                terms of services{" "}
              </Link>
            </div>
            <button className="agree_join_button  ">Agree and Join</button>
          </form>

          <div style={{ paddingBottom: "30px" }}>
            <Link to="/login" style={{ color: "#FE8303" }}>
              Already have an account?
            </Link>
          </div>
        </div>
        {/* /////// */}
        <div className="about_platfrom">
          <About />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
