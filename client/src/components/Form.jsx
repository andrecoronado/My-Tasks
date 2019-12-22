import React, { useState }  from "react";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import api from '../api';

function Form(props)  {
  var [login, setLogin] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      register: props.isRegistered,
      message:"",
      data:{},
      token: "",
      status: false
    });

  function  handleChange(event) {
    let { name, value } = event.target;
    setLogin(prevLogin => {return {...prevLogin,[name]: value, token: "", status: false }});
  }
  
  const handleBlur = async () => {
      const getUser = await api.getUser(login.email);
      setLogin(prevLogin => {
        return { 
          ...prevLogin, 
          register: getUser.data.success,
          data: getUser.data.data,
          message:""
        }})
  }

  function submitForm(event) {
    event.preventDefault();
    if(login.register === true && login.name !== ""){
      const isMatch = bcrypt.compareSync(login.password, login.data.password);
      if(isMatch){
        setLogin(prevLogin => {
            return { 
                    ...prevLogin,  
                    token: jwt.sign({ _id: login.email}, 'logininthisapplication', { expiresIn:'1 days' }), 
                    status: true,
                    message:"Login is Successful!!"
                }})
        }
      else{
        setLogin(prevLogin => {return { ...prevLogin,  message: "Unsuccessful login! Something is wrong. Please try again. "}})
      }
    }
    else{
      if(login.password === login.confirmPassword){
            const hash = bcrypt.hashSync(login.password,bcrypt.genSaltSync(10));
            const payload={name: login.name, email: login.email, password: hash};
            const insertUser = api.insertUser(payload).then(function (response) {
              setLogin(prevLogin => {
                  return { 
                          ...prevLogin,  
                          email:"",
                          password:"",
                          register:true,
                          message:"Registration is successful!!"
                        }})
            }).catch(function (error) {
              console.log([error,insertUser]);
              setLogin(prevLogin => {return { ...prevLogin,  message: "There is something wrong."}})
            });
        }  
      else{
        setLogin(prevLogin => {return { ...prevLogin,  message: "Please, confirm your passwords."}})
      }   
    }
  }
  return (
      <form className="form">
        <input type="email" placeholder="e-mail" onChange={handleChange} onBlur={handleBlur}  name="email" value={login.email} />
        {!login.register && (<input type="text" placeholder="Username" onChange={handleChange}  name="name" value={login.name} />)}
        <input type="password" placeholder="Password" onChange={handleChange}  name="password" value={login.password}/>
        {!login.register && (<input type="password" placeholder="Confirm Password" onChange={handleChange}  name="confirmPassword"/>)}
        <button onClick={submitForm}>{login.register ? "Login" : "Register"}</button>
        <h2> {login.message}</h2>
      </form>)
}
export default Form;