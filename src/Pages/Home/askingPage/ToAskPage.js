import React, { useContext, useEffect, useState } from "react";
import "./toAsk.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ToAskPage() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  // ////if there is no userdata(token and user that means)navigate to login page
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  // ///targets the values on change and updates it in form(declared at top)..if so we can acces the typed word from form that means
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // //////////on sumbit we are passing the values targeted in handele change so that it can post it in database
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/questions/ask`,
        {
          ////the name given:and the one targeted from form.name given////
          questionTitle: form.questionTitle,
          questionDescription: form.questionDescription,
        },
        {
          // ///passing it auth...with out this it wont post it
          headers: { "x-auth-token": userData.token },
        }
      );

      console.log(loginRes.data);
      // ///once posted we navigate it to hompage beacause we want to display the questions on hompage
      navigate("/");
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div
        className="informationDiv"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Steps to write a good question</h2>
          <ul style={{ listStylePosition: "inside", textAlign: "left" }}>
            <li>Summarize your problem in one-line title</li>
            <li>Describe your problem in more detail</li>
            <li>Describe what you tried and what you expected to happen</li>
            <li>Review your question and post it on the site</li>
          </ul>
        </div>
      </div>
      <div className="askQuestionContainer">
        <div className="askQuestionDiv">
          <div>
            <h3>Ask public a question</h3>
            <p>Go to question page</p>
          </div>

          <div>
            <FloatingLabel controlId="floatingInput" className="mb-3 ">
              <Form.Control
                type="text"
                placeholder="Title"
                name="questionTitle"
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" className="textArea ">
              <Form.Control
                name="questionDescription"
                onChange={handleChange}
                placeholder="Question Description"
                style={{
                  height: "100px",
                  alignItems: "center",
                }}
              />
            </FloatingLabel>
          </div>
        </div>
        <div className="postButtonDiv">
          <button className="postButton" onClick={handleSumbit}>
            Post your question
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToAskPage;
