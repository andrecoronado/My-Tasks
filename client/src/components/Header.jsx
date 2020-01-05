import React from "react";
import InsertCommentTwoToneIcon from '@material-ui/icons/InsertCommentTwoTone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Container, Row, Col }  from 'react-bootstrap';
import apis  from '../api'

function Header(props) {

  function handleClick() {
     const logoutAll = apis.logoutAll()
     const logOff = props.setLogOff()
     console.log(logoutAll + ' All ')
     console.log(logOff + ' Off ')
  }

  return (
    <header>
      <Container fluid={true}>
        <Row >
          <Col xs={10} md={11}>
            <h1>
              <InsertCommentTwoToneIcon htmlColor={'#f5564e'}/>
               My Tasks
            </h1>
          </Col>
          <Col xs={2} md={1} className="icon-exit" onClick={handleClick} >
            <PowerSettingsNewIcon  color="secondary"/>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;