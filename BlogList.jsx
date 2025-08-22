import React from "react";
import { Link } from "react-router-dom";

export default function BlogList({ blogs, searchTerm, setSearchTerm }) {
  return (
    <>
      <div className="search-panel">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts…"
        />
      </div>

      {blogs.length === 0 ? (
        <div className="no-results">No posts found.</div>
      ) : (
        <div className="grid-container">
          {blogs.map((b) => (
            <Link key={b.id} to={`/blog/${b.id}`} className="blog-card">
              <img src={b.thumbnail} alt={b.title} loading="lazy" />
              <h2>{b.title}</h2>
              <p>{b.description}</p>
              <button>Read more</button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
