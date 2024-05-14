import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, avatar } = props;
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image
          style={{ width: "60px", height: "60px" }}
          className="blog-author"
          src={avatar}
          roundedCircle
          fluid
        />
      </Col>
      <Col className="d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-center">
          <h6 className="m-0">{name}</h6>
        </div>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
