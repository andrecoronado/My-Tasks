import React from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Container, Row, Col, OverlayTrigger, Tooltip }  from 'react-bootstrap';
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
              <img  src="logo.png" alt="My Tasks"/>
               My Tasks
            </h1>
          </Col>
          <OverlayTrigger
            key={'bottom'}
            placement={'bottom'}
            overlay={<Tooltip id={`tooltip-bottom`}>Logoff</Tooltip>}
          >
            <Col xs={2} md={1} className="icon-exit" onClick={handleClick} >
              <PowerSettingsNewIcon  color="secondary"/>
            </Col>
          </OverlayTrigger>
        </Row>
      </Container>
    </header>
  );
}

export default Header;