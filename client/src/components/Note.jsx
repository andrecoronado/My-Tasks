import React  from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckboxInput from "./Checkbox";
import FormGroup from '@material-ui/core/FormGroup';

function Note(props) {
  function handleClick() {
    props.onDelete( props._id );
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <FormGroup row>
        <CheckboxInput 
         _id = {  props._id }
         setLogOff={props.setLogOff}
         completed={props.completed}
        />
        <button onClick={handleClick} >
            <DeleteIcon />
        </button>
      </FormGroup>

    </div>
  );
}

export default Note;
