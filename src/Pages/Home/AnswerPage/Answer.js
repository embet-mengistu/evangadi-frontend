import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./answer.css";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

import exampleImage from "../../../images/smallerProfileImage.png";

function AnswerPage({ allQuestions }) {
  const [question, setQuestion] = useState([]);
  const [userData, setUserData] = useContext(UserContext);
  const [filteredquestionId, setQuestionId] = useState(null);

  /////////////////////////////////////////

  // //useParams allows you to access the parameters from the current URL path,
  //  any URL that matches the pattern /posts/:postID(which we gave it in app.js) will trigger in this component, and the postID parameter will be extracted from the URL.
  const { postID } = useParams();
  console.log(postID);

  // /////fetching the question based on there postId so that i can display them(the questions) ////////////
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // //fetching the questions from data base (getPosts(found in question.controller))
        const questionRes = await fetch("http://localhost:3000/api/questions", {
          method: "GET",
          // ///needs auth
          headers: {
            "x-auth-token": userData.token,
          },
        });

        if (!questionRes.ok) {
          throw new Error("Network response was not ok");
        }
        // /////if there is data change it to json fromat and put it in variable responseData
        const responseData = await questionRes.json();
        console.log(responseData);

        // ////from the changed jsonformat(which is responseData) select me only the data that why we did .data
        const data = responseData.data;
        console.log(data);

        // /////from the selected data, filter me the question by it post_id...
        // so the post_id from selected data must be equal to the current URL path which is postID
        const filteredData = data.filter(
          (question) => question.post_id === postID
        );
        // ///once filtered update it in setQuestion which is declared above
        console.log(filteredData);
        setQuestion(filteredData);

        //////////////////////// to get the Questionid/////////
        setQuestionId(filteredData[0].question_id);
        console.log(filteredData[0].question_id);
        ////////////////////////////////////////////
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    // //after doing all the above trigger the function
    fetchQuestions();
  }, [postID, userData.token]);
  ////////////////////////end of fetching questions//////////////////////////////

  ////////////////////to post the answer starts here////////////////////
  console.log(filteredquestionId);

  // ////////GETING THE DATA BASED ON THE FILTERDQUESTIONID////
  const [allAnswers, setAllAnswers] = useState([]);

  const fetchAnswers = async () => {
    try {
      const answerRes = await axios.get(
        `http://localhost:3000/api/answer/${filteredquestionId}`,
        {
          headers: { "x-auth-token": userData.token },
        }
      );

      setAllAnswers(answerRes.data.data);
      console.log(answerRes.data.data);
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [filteredquestionId, userData.token]);

  // /////POSTING THE QUESTION///////
  const navigate = useNavigate();

  const [form, setForm] = useState({
    answerDescription: "",
  });

  // targets the values and updates it on form(which is declared)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelClick = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(
        "http://localhost:3000/api/answer/postanswer",
        {
          answerDescription: form.answerDescription,
          questionId: filteredquestionId,
          // ///passing the filterdId to the backend
        },
        {
          headers: { "x-auth-token": userData.token },
        }
      );

      console.log(loginRes.data);

      // After successfully posting the answer, fetch the answers again
      fetchAnswers();
      setForm({ ...form, answerDescription: "" });
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className="container">
      <div className="questionInfo">
        {/* displaying the filtered data which is the question data */}
        {question.map((question) => (
          <div key={question.product_id}>
            <h3>Question</h3>
            <h5>{question.question}</h5>
            <h6>{question.question_description}</h6>
            {console.log(question.question_id)}
            <hr />
          </div>
        ))}
        {/* /// */}

        {/* ////diplaying the answers from the community */}
        <div className="answerFromCommunity">
          <h4>Answer from the community</h4>
          <hr />
          {allAnswers.map((answer) => (
            <div key={answer.answer_id}>
              <div className="answerInfo">
                <div>
                  <img src={exampleImage} />
                  <h6>{answer.user_name}</h6>
                </div>
                <div className="answerTitle">{answer.answer}</div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        {/* /////////// */}
      </div>

      <div className="askQuestionContainer">
        <div className="askQuestionDiv2">
          <div className="askQuestionDesc">
            <h3>Answer the top question</h3>
            <Link to="/">Go to question page</Link>
          </div>

          <div>
            <FloatingLabel controlId="floatingTextarea2" className="textArea ">
              <Form.Control
                name="answerDescription"
                placeholder="Your answer..."
                as="textarea"
                onChange={handleChange}
                style={{
                  height: "200px",
                  alignItems: "center",
                  paddingTop: "20px",
                }}
              />
            </FloatingLabel>

            <div name="questionId"></div>
            <div className="postButtonDiv">
              <button className="postButton" onClick={handelClick}>
                Post your Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerPage;
