import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
  const [RTValue, setRTValue] = useState();
  const [RTUnit, setRTUnit] = useState();
  const [title, setTitle] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const navigate = useNavigate();
  //  const [newBlogId, setNewBlogId] = useState("");

  const handleHome = () => {
    navigate("/home");
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();
    await handleNewPost();
    //navigate(`/home}`);
  };

  async function handleNewPost() {
    try {
      const res = await fetch("http://localhost:3001/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          category: category,
          cover: coverURL,
          readTime: {
            value: RTValue,
            unit: RTUnit,
          },
          author: {
            name: authorName,
            avatar: authorAvatar,
          },
          content: text,
        }),
      });
      const json = res.json();
      if (res.ok) {
        // setNewBlogId(json._id);
        alert("New Post Created!");
      }
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="">
          <Form.Label>Author</Form.Label>
          <Form.Control
            onChange={(e) => {
              setAuthorName(e.target.value);
            }}
            size="sm"
            placeholder="Author"
            className="mb-4"
          />
          <Form.Label>AvatarURL</Form.Label>
          <Form.Control
            onChange={(e) => {
              setAuthorAvatar(e.target.value);
            }}
            size="sm"
            placeholder="AvatarURL"
            className="mb-4"
          />
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            size="sm"
            placeholder="Title"
            className="mb-4"
          />
          <Form.Label>Cover</Form.Label>
          <Form.Control
            onChange={(e) => {
              setCoverURL(e.target.value);
            }}
            size="sm"
            placeholder="Cover"
            className="mb-4"
          />
          <Form.Label>Read Time - Value</Form.Label>
          <Form.Control
            onChange={(e) => {
              setRTValue(e.target.value);
            }}
            size="sm"
            placeholder="Read Time - Value"
            className="mb-4"
          />
          <Form.Label>Read Time - Unit</Form.Label>
          <Form.Control
            onChange={(e) => {
              setRTUnit(e.target.value);
            }}
            size="sm"
            placeholder="Read Time - Unit"
            className="mb-4"
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            size="sm"
            as="select"
            className="mb-4"
          >
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
            <option>Category 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-5">
          <Form.Label>Write your heart out</Form.Label>
          <Form.Control
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="sm" variant="outline-dark">
            Reset
          </Button>
          <Button
            onClick={handleSubmitNewPost}
            type="submit"
            size="sm"
            className="ms-2"
            variant="dark"
          >
            Invia
          </Button>
          <Button
            variant="success"
            className="ms-2"
            size="sm"
            onClick={handleHome}
          >
            {" "}
            Home{" "}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
