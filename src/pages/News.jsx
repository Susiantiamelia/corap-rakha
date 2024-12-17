import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../components/slices/newsSlice";

const News = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!articles || articles.length === 0) {
    return <h2>No articles available</h2>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Latest News</h1>
{/*       <div className="row">
        {articles.slice(0, 9).map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 p-2">
              <div className="d-flex flex-row align-items-start">
                <img
                  src={
                    article.multimedia && article.multimedia[0]
                      ? `https://static01.nyt.com/${article.multimedia[0].url}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={article.headline.main}
                  className="img-fluid"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <div className="card-body p-0">
                  <h6
                    className="card-title"
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    {article.headline.main}
                  </h6>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "12px",
                      marginBottom: "10px",
                      color: "#555",
                    }}
                  >
                    {article.snippet.length > 70
                      ? article.snippet.substring(0, 70) + "..."
                      : article.snippet}
                  </p>
                  <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default News;
