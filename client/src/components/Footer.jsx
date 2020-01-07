import React from "react"
import Emoji from "./Emoji"

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright © {year} | andreCoronado.com <Emoji symbol="👨‍💻" label="amazing"/></p>
    </footer>
  );
}

export default Footer;
