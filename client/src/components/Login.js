import React from 'react'
import { useState } from 'react'

function Login() {

 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
  
  return (
    <div className="login">
      <label> Login</label>

      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={""}> Login</button>
    </div>
  )
}

export default Login