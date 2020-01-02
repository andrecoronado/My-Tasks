import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import api from '../api'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

function CheckboxInput(props) {

  const [state, setState] = React.useState({
    checked: props.completed})

   const handleChange = name => event => {
      api.updateTask({ _id: props._id, completed: event.target.checked })
      .catch(function (error) { if( error.response.status === 401 ){ props.setLogOff() } })

      setState({ ...state, [name]: event.target.checked });
    };

  return (
    
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checked}
            onChange={handleChange('checked')}
            value="checked"
          />
        }
        label=""
      />
  );
}

export default CheckboxInput;