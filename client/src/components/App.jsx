import React, { useState }   from "react"
import Login from "./Login"
import Tasks from "./Tasks"
import api from '../api'

var page = ''
function App() {
    var [login, setLogin] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
        register: "",
        message:"",
        status: false,
        notes: []
    });

    function setLogOff(){
        setLogin(prevLogin => {
            return { 
              ...prevLogin, 
              status: false,
              password: "",
              confirmPassword:"",
              notes: [],
              message:"Please authenticate." 
            }})
            api.apiToken('')
            window.sessionStorage.success = false
    }
    
    if( !login.status ) {
        page = <Login 
            login = { login }
            setLogin = { setLogin }
                />  
    }
    else{
        page = <Tasks 
            login = { login }
            setLogin = { setLogin } 
            setLogOff = { setLogOff }
            />  
    }

    return ( 
        <div>
            { page } 
        </div>
    );
}

export default App;