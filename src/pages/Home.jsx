import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../components/slices/compareSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { top10Countries, loading, error } = useSelector(
    (state) => state.compare
  );
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3">Loading data, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger my-5">
        <h2>Error: {error}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/SyaLcfMeeEM?si=BCpVMwegOEW9D9EC"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="shadow rounded"
          ></iframe>
          <blockquote className="blockquote mt-4 text-secondary">
            <p className="mb-0">
              “Activism works. So what I'm telling you to do now, is to act.
              Because no one is too small to make a difference.”
            </p>
            <footer className="blockquote-footer mt-2">Greta Thunberg</footer>
          </blockquote>
        </div>
      </div>

      {/* Table Section */}
      <div className="row">
        {/* Tabel di kolom kiri */}
        <div className="col-md-8">
          <h2 className="mb-4 text-center text-primary">
            Top 10 Countries by Population
          </h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered shadow-sm">
              <thead className="thead-dark">
                <tr>
                  <th>No</th>
                  <th>Country</th>
                  <th>Code</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                {top10Countries.map((country, index) => (
                  <tr
                    key={country.code}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{country.name}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#007bff",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedCountry(country)}
                      >
                        {country.code}
                      </span>
                    </td>
                    <td>{country.population.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail negara di kolom kanan */}
        <div className="col-md-4">
          {selectedCountry ? (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{selectedCountry.name}</h5>
                <p className="card-text">
                  <strong>Population:</strong>{" "}
                  {selectedCountry.population.toLocaleString()}
                  <br />
                  <strong>Area:</strong>{" "}
                  {selectedCountry.area
                    ? selectedCountry.area.toLocaleString()
                    : "N/A"}{" "}
                  km²
                  <br />
                  <strong>Capital:</strong> {selectedCountry.capital}
                  <br />
                  <strong>Region:</strong> {selectedCountry.region}
                  <br />
                  <strong>Subregion:</strong> {selectedCountry.subregion}
                  <br />
                  <strong>Languages:</strong> {selectedCountry.languages}
                </p>
                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => setSelectedCountry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted">
              Click on a country code to see details here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
