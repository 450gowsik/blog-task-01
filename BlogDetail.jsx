import React from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail({ blogs }) {
  const { id } = useParams();
  const blog = blogs.find((b) => String(b.id) === String(id));

  if (!blog) {
    return (
      <div className="blog-detail">
        <p>Post not found.</p>
        <Link to="/" className="back-btn">← Back</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <Link to="/" className="back-btn">← Back</Link>
      <h2>{blog.title}</h2>
      <img src={blog.thumbnail} alt={blog.title} />
      <p>{blog.content}</p>
    </div>
  );
}
