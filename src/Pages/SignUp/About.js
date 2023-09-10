import React from "react";
import Button from "react-bootstrap/Button";
import { LoremIpsum } from "react-lorem-ipsum";

function About() {
  return (
    <div>
      <h6 style={{ fontSize: "12px", color: "#FE8303" }}>About</h6>
      <h3>Evangadi Networks Q&A</h3>
      <div
        style={{ fontSize: "12px", width: " width: 480px;" }}
        className="about_description"
      >
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Adui sapien
          dignissim velit fusce dictum fermentum. Magnis volutpat scelerisque
          lectus vestibulum natoque etiam placerat nascetur per. Porttitor fusce
          eleifend taciti ridiculus, sodales libero nullam. Quam aliquam
          senectus torquent sagittis arcu etiam fusce nisl. Nibh cras ornare
          placerat penatibus eu rutrum. Ac aenean sociosqu nisl pharetra vivamus
          ipsum nulla.
        </p>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Adui sapien
          dignissim velit fusce dictum fermentum. Magnis volutpat scelerisque
          lectus vestibulum natoque etiam placerat nascetur per. Porttitor fusce
          eleifend taciti ridiculus, sodales libero nullam. Quam aliquam
          senectus torquent sagittis arcu etiam fusce nisl. Nibh cras ornare
          placerat penatibus eu rutrum. Ac aenean sociosqu nisl pharetra vivamus
          ipsum nulla.
        </p>

        {/* <LoremIpsum p={2} /> */}
      </div>
      <Button style={{ backgroundColor: "#FE8303" }}>How it works</Button>
    </div>
  );
}

export default About;
