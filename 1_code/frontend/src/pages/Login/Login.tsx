import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
//@ts-ignore
export default function Login({ setIsLoggedIn }) {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [message, setMessage] = React.useState("");
  let navigate = useNavigate();

  //@ts-ignore
  const attemptSignIn = async (e) => {
    e.preventDefault();
    if (user === "") {
      alert("Please enter a valid email address");
      return;
    }
    if (pass === "") {
      alert("Please enter a valid password");
      return;
    }
    const form = {
      email: user,
      password: pass,
    };

    const { data } = await axios.post(
      "http://localhost:3001/api/v1/user/signin",
      form
    );
    if (data.status === parseInt("401")) {
      setMessage(data.response);
    } else {
      localStorage.setItem("token", JSON.stringify(jwt(data.token)));
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="grid grid-cols-1 justify-items-center">
      <div className="bg-white grid  text-black grid-cols-1 rounded-xl p-5 m-5 justify-items-center">
        <form onSubmit={(e) => attemptSignIn(e)}>
          <div className="grid grid-cols-2 gap-2 ">
            <label>email address:</label>
            <input type="email" onChange={(e) => setUser(e.target.value)} />
            <label>password:</label>
            <input type="password" onChange={(e) => setPass(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      <div>{message}</div>
    </div>
  );
}
