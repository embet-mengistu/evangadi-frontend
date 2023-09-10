import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div>
          <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" />
        </div>
        <div className="footer_desc">
          <h5>Useful Links</h5>
          <Link>How it Works</Link>
          <br />
          <Link> Terms Of Service</Link>
          <br />
          <Link> Privacy policy</Link>
        </div>
        <div className="footer_desc">
          <h5>Contact Info </h5>
          <Link>Evangadi Networks</Link>
          <br />
          <Link> support@evangadi.com</Link>
          <br />
          <Link> +1 202-368-2702</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
