import React from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/new");
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Button variant="light" size="lg" className="mb-3" onClick={handleCreate}>
        +
      </Button>
      <BlogList />
    </Container>
  );
};

export default Home;
