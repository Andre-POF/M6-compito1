import React from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Container,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    handleRegister(username, password, name, lastName, birthDate, avatar);
    navigate("/home");
  };

  async function handleRegister(user, pass, name, lastName, avatar, birthDate) {
    try {
      const res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          password: pass,
          name: name,
          lastName: lastName,
          birthDate: birthDate,
          avatar: avatar,
        }),
      });
      if (res.ok) {
        console.log("New user!");
        alert("New user created!");
      }
      //const json = await res.json();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Container>
        <Form>
          <FormGroup>
            <FormLabel size="sm" className="my-3 mt-5">
              Username
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              size="sm"
              className="mb-4"
              placeholder="username"
              style={{ width: "400px" }}
            ></FormControl>
            <FormLabel size="sm" className="my-3">
              Password
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ width: "400px" }}
              size="sm"
              className="mb-4"
              placeholder="password"
            ></FormControl>
            <FormLabel size="sm" className="my-3">
              Name
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{ width: "400px" }}
              size="sm"
              className="mb-4"
              placeholder="name"
            ></FormControl>
            <FormLabel size="sm" className="my-3">
              Last Name
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              style={{ width: "400px" }}
              size="sm"
              className="mb-4"
              placeholder="Last Name"
            ></FormControl>
            <FormLabel size="sm" className="my-3">
              Birth Date
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
              style={{ width: "400px" }}
              size="sm"
              className="mb-4"
              placeholder="Birth Date"
            ></FormControl>
            <FormLabel size="sm" className="my-3">
              AvatarURL
            </FormLabel>
            <FormControl
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
              style={{ width: "400px" }}
              size="sm"
              className="mb-4"
              placeholder="AvatarURL"
            ></FormControl>
          </FormGroup>
          <Button type="submit" variant="light" onClick={handleSubmitRegister}>
            {" "}
            Register User{" "}
          </Button>
        </Form>
      </Container>
    </>
  );
}
