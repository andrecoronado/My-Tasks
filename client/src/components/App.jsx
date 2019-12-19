import React  from "react";
import Form from "./Form";

var userIsRegistered = true;
const headerName="Personal Tasks";

function App() {
    return ( 
        <div className = "container" >
            <h1>{headerName}</h1>
            <Form isRegistered = { userIsRegistered }/>   
        </div>
    );
}

export default App;