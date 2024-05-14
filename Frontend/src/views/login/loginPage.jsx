import React from "react";
import { Button, FormGroup, Form, FormControl } from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
//import { TokenContext } from "../../context/tokenContext.provider.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { token, setToken } = useContext(TokenContext);
  const [token, setToken] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log(token);
    await handleLogin(username, password);
    navigate("/home");
    console.log(`${username} and ${password}`);
  };

  // const handlePassword = async (e) => {
  //   await setPassword(e.target.value);
  // };

  // const handleUsername = async (e) => {
  //   await setUsername(e.target.value);
  // };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    const str = "http://localhost:3001/googleuser/googleLogin";
    window.open(str, "_self");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  async function handleLogin(user, pass) {
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "domingo 12",
          password: "ola bom dia a todos",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Invalid username or password");
      } else {
        setToken(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3 className="my-5"> Log in to Strive Blog </h3>
      <Form onSubmit={handleSubmitLogin}>
        <FormGroup>
          <FormCheckLabel> Email or Username</FormCheckLabel>
          <FormControl
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="mb-3 form-control-sm"
            placeholder="Email or Username"
          ></FormControl>
          <FormCheckLabel> Password</FormCheckLabel>
          <FormControl
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mb-3 form-control-sm"
            placeholder="Password"
          ></FormControl>
        </FormGroup>
        <div className="d-flex justify-content-around ">
          <Button type="submit" size="sm" variant="dark" className="">
            Login
          </Button>
          <Button
            type="button"
            size="sm"
            variant="dark"
            onClick={handleRegister}
            className=""
          >
            Register
          </Button>
        </div>
      </Form>

      <div>
        <hr className="solid" />
      </div>
      <Button
        variant="light"
        className="border border-dark rounded-pill"
        onClick={handleGoogleAuth}
      >
        <FontAwesomeIcon className="fa-brands fa-google"></FontAwesomeIcon>
        Login with Google
      </Button>
    </div>
  );
}
