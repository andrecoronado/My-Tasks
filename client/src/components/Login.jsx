import React from "react"
import apis  from '../api'

function Login(props)  {
  const headerName="Personal Tasks"

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
        <div className = "container">
          <h1>{ headerName }</h1>
          <form className="form">
            <input type="email" placeholder="e-mail" onChange={handleChange} onBlur={handleBlur}  name="email" value={props.login.email} />
            {props.login.register === false && (<input  type="text" placeholder="Full Name" onChange={handleChange}  name="name" value={props.login.name} />)}
            {props.login.register !== "" && (<input type="password" placeholder="Password" onChange={handleChange}  name="password" value={props.login.password}/>)}
            {props.login.register === false && (<input  type="password" placeholder="Confirm Password" onChange={handleChange}  name="confirmPassword"/>)}
            {props.login.register !== "" && (<button  onClick={submitForm}>{props.login.register ? "Login" : "Register"}</button>)}
            {props.login.register === "" && (<button onClick={submitForm}>Check</button>)}
            <h2> {props.login.message}</h2>
          </form>
        </div>
      </section>)
}
export default Login;