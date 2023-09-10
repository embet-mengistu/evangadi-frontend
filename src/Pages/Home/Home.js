import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import AnswerPage from "./AnswerPage/Answer";
import exampleImage from "../../../src/images/smallerProfileImage.png";

function Home({ logout }) {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [userData, setUserData] = useContext(UserContext);

  const handleClick = () => {
    navigate("/toAskPage");
  };
  // ////we are fetching the questions posted so that we can display it
  const Questions = async () => {
    try {
      const questionRes = await axios.get(
        // ///made route for it in question.router (getquestions function in question.controller)
        `${process.env.REACT_APP_base_url}/api/questions/ask`,
        {
          // ////need auth to fetch it
          headers: { "x-auth-token": userData.token },
        }
      );
      // ////after it fetchs the data it updates it allQuestions declared at top(so then we can access it from there)
      setAllQuestions(questionRes.data.data);
      //the reason we write .data.data is bc its structured with a nested data property that holds the relevant information,
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };
  console.log(allQuestions);

  // /////if userdata is empty/false(which means no token )navigate to login...
  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    } else {
      // ///but if they are logged in excute the question function(whic means only logged in people can see the questions)
      Questions();
    }
  }, [userData.user, navigate]);

  return (
    <div className="container">
      <div className="headers">
        <button type="" onClick={handleClick} className="askBotton">
          Ask question
        </button>
        <h3 className="welcomeSection ">
          Welcome:{userData.user?.display_name}
        </h3>
      </div>
      <div className="questionSection">
        <h2>Questions</h2>
        <hr style={{ borderColor: "black" }} />
        {/* ////////we are mapping the info we got from the allquestions declared state and diplaying them(so when ever someone posts it will be displayed here) */}
        {allQuestions.map((question) => (
          /////when ever clicked take it to  answer page depending on it post_id(and in appjs we ardly wrote in the path that  we are gonna pass the postID(kindof declaring a variable),so when everclicked the variable declared in app.js will be replaced by ${question.post_id}   )
          <Link to={`/answer/${question.post_id}`} className="toanswerLink">
            <div key={question.post_id}>
              <div className="displayerDiv">
                <div className="nameAndDesc">
                  <div>
                    <img src={exampleImage} />
                    <p> {question.user_name}</p>
                  </div>
                  <div>
                    <p className="questionTitle">{question.question}</p>
                  </div>
                </div>

                <div className="arrow">
                  <ArrowForwardIosIcon />
                </div>
              </div>

              <hr style={{ borderColor: "black" }} />
            </div>
          </Link>
        ))}
      </div>
      {/* <AnswerPage allQuestions={allQuestions} /> */}
    </div>
  );
}

export default Home;
