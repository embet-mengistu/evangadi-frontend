import React, { useContext, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useContext(UserContext);

  const signIn = () => {
    navigate("/login");
  };

  // ////////make the setuserdata token empty(if its empty they will no longer have acces to the home page which will be automatically signed out that means)
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <div className="nav-wrapper fixed-top">
        <div className="container">
          <nav className="navbar navbar-toggleable-sm navbar-expand-xl">
            <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" />
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              ☰
            </button>

            <div className="navbar-collapse collapse navbars">
              <ul className="navbar-nav nav-justified w-100 nav-fill">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger " href="#">
                    How it Works
                  </a>
                </li>
                {/* //////if there is userdata(only comes when logged in)write logout bc it signed in ardy and if not write sign in(bc it not logged in) */}
                {userData.user ? (
                  <button onClick={logout} className="nav-item nav_button">
                    Log Out
                  </button>
                ) : (
                  <button onClick={signIn} className="nav-item nav_button">
                    Sign In
                  </button>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
