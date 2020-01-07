import React from "react"
import apis  from '../api'
import Footer from "./Footer"
import List from "./List"
import { Container, Row, Col }  from 'react-bootstrap'

function Login(props)  {
  const headerName="Sign in | Register"

  function  handleChange(event) {
    let { name, value } = event.target
    props.setLogin(prevLogin => {return {...prevLogin, [name]: value, status: false }})
  }
  
  const handleBlur = async () => {
      const getUser = await apis.getUserByEmail(props.login.email)
      props.setLogin(prevLogin => {
        return { 
          ...prevLogin, 
          register: getUser.data.success,
          name: getUser.data.user.name,
          message:""
        }})
  }

  async function submitForm(event) {
    event.preventDefault()
    if(props.login.register === true && props.login.name !== ""){
        const loginUser = await apis.loginUser({"email": props.login.email, "password": props.login.password})
        if( loginUser.data.success ){
          apis.apiToken(loginUser.data.token)
          window.sessionStorage.success = true
          const getTasks = await apis.getTasks ()
          props.setLogin(prevLogin => {
            return { 
              ...prevLogin,
              password: "",
              confirmPassword:"", 
              message: "Login done!",
              status: true,
              notes: getTasks.data
            }})
        }
        else{
          props.setLogin(prevLogin => {return { ...prevLogin,  message: "Please, confirm your information."}})
        }
    }
    else{
      if(props.login.password === props.login.confirmPassword){
          const registerUser = await apis.createUser({"name": props.login.name, "email": props.login.email, "password": props.login.password})
          if( registerUser.data.success ){
            apis.apiToken(registerUser.data.token)
            props.setLogin(prevLogin => {
              return { 
                ...prevLogin, 
                password: "",
                confirmPassword:"", 
                message: "Register done!",
                status: true,
                register: true
              }})
              window.sessionStorage.success = true
          }
        }  
      else{
        props.setLogin(prevLogin => {return { ...prevLogin,  message: "Please, confirm your passwords."}})
      }   
    }
  }

  return (
      <section className = "login">     
        <Container fluid={true}>   
          <Row >
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="page">
                  <Row >
                    <Col xs={4} sm={3} md={4}>
                      <img  src="logo.png" alt="My Tasks"/>
                    </Col>
                    <Col xs={8} sm={9} md={8}>
                      <h1>My Tasks</h1>
                      <h2>Free To-Do List</h2>
                    </Col>
                  </Row>
                  <List />
                </div>
              </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="page-user">
                  <h3>{ headerName }</h3>
                  <form className="form">
                    <input type="email" placeholder="e-mail" onChange={handleChange} onBlur={handleBlur}  name="email" value={props.login.email} />
                    {props.login.register === false && (<input  type="text" placeholder="Full Name" onChange={handleChange}  name="name" value={props.login.name} />)}
                    {props.login.register !== "" && (<input type="password" placeholder="Password" onChange={handleChange}  name="password" value={props.login.password}/>)}
                    {props.login.register === false && (<input  type="password" placeholder="Confirm Password" onChange={handleChange}  name="confirmPassword"/>)}
                    {props.login.register !== "" && (<button  onClick={submitForm}>{props.login.register ? "Sig in" : "Register"}</button>)}
                    {props.login.register === "" && (<button onClick={submitForm}>Check</button>)}
                    <h4> {props.login.message}</h4>
                  </form>
              </div>
            </Col>
          </Row>
        </Container>
      <Footer />
    </section>)
}
export default Login;