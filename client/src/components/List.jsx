import React from "react";
import Emoji from "./Emoji"

function List() {
  return (
    <ul>
      <li><span>Easy, simple and fast<Emoji symbol="👏" label="very nice"/></span></li>
      <li><span>Keep your tasks in a cloud<Emoji symbol="🙏" label="please"/></span></li>
      <li><span>Access your tasks from your cell phone or desktop<Emoji symbol="🙌" label="amazing"/></span></li>
    </ul>
  );
}

export default List;
