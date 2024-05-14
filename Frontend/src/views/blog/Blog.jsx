import React, { useEffect, useState } from "react";
import { Container, Image, Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = (props) => {
  const [comments, setComments] = useState([]);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const handleAddComment = () => {
    postComments();
  };

  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (blog) fetchComments();
  }, [blog]);

  async function fetchComments() {
    try {
      const res = await fetch(`http://localhost:3001/blogPosts/${id}/comments`);
      const json = await res.json();
      setComments(json);
      setLoading(false);
    } catch (error) {}
  }

  async function fetchPosts() {
    try {
      const res = await fetch(`http://localhost:3001/blogPosts/${id}`);
      const json = await res.json();
      setBlog(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function postComments() {
    try {
      const res = await fetch(`http://localhost:3001/blogPosts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      });
    } catch (error) {}
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="blog-details-root">
          <div className="home mt-5 ms-5"></div>
          <Container>
            <div className="d-flex justify-content-center">
              <Image
                className="blog-details-cover"
                style={{ width: "600px" }}
                src={blog.cover}
                fluid
              />
            </div>
            <h3 className="blog-details-title">{blog.title}</h3>
            <div className="blog-details-container d-flex align-items-center">
              <div className="blog-details-author mb-3">
                <BlogAuthor
                  name={blog.author.name}
                  avatar={blog.author.avatar}
                />
              </div>
              <div className="blog-details-info mb-3">
                <div>{blog.createdAt}</div>
                <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  variant="btn btn-outline-dark"
                  className="mt-5 me-3"
                  size="sm"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {" "}
                  + Comment{" "}
                </Button>
                <div className="d-flex">
                  <Form
                    className="mt-2 mb-1"
                    style={{ display: show ? "block" : "none" }}
                  >
                    <FormControl
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      className="mt-2 mb-1"
                      size="sm"
                      placeholder="Leave your comment.."
                    ></FormControl>
                    <Button
                      onClick={handleAddComment}
                      type="submit"
                      size="sm"
                      variant="btn btn-outline-dark"
                    >
                      +
                    </Button>
                  </Form>
                </div>
              </div>
              <div>
                <Button
                  variant="success"
                  className="mt-5 me-3"
                  size="sm"
                  onClick={handleHome}
                >
                  {" "}
                  Home{" "}
                </Button>
              </div>
            </div>
            <div className="">
              {comments.map((comment, i) => (
                <div
                  className="my-4"
                  style={{ border: "solid 1px", borderRadius: "6px" }}
                  key={i}
                >
                  <div className="ms-2" style={{ fontSize: "14px" }}>
                    {" "}
                    {blog.author.name}:{" "}
                  </div>
                  <span
                    className="ms-2"
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {comment.content}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </>
    );
  }
};
export default Blog;
