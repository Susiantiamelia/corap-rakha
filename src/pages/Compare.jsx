import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../components/slices/compareSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Compare = () => {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.compare);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  // Fetch countries when the component mounts
  React.useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Handle input changes
  const handleInputChange1 = (e) => {
    const value = e.target.value;
    setCountry1(value);
    if (value === "") {
      setSuggestions1([]);
    } else {
      const filteredSuggestions = countries.filter((country) =>
        country.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions1(filteredSuggestions);
    }
  };

  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setCountry2(value);
    if (value === "") {
      setSuggestions2([]);
    } else {
      const filteredSuggestions = countries.filter((country) =>
        country.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions2(filteredSuggestions);
    }
  };

  const handleSuggestionClick1 = (country) => {
    setCountry1(country.name);
    setSuggestions1([]);
  };

  const handleSuggestionClick2 = (country) => {
    setCountry2(country.name);
    setSuggestions2([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const countryData1 = countries.find(
      (country) => country.name.toLowerCase() === country1.toLowerCase()
    );
    const countryData2 = countries.find(
      (country) => country.name.toLowerCase() === country2.toLowerCase()
    );

    setResult1(countryData1 ? countryData1 : null);
    setResult2(countryData2 ? countryData2 : null);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading data, please wait...</p>
      </div>
    );
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Compare Two Countries</h2>
      <form onSubmit={handleSearch} className="mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Type Country Name (1)"
              value={country1}
              onChange={handleInputChange1}
            />
            {suggestions1.length > 0 && (
              <ul className="list-group mt-2">
                {suggestions1.map((country, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick1(country)}
                    style={{ cursor: "pointer" }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Type Country Name (2)"
              value={country2}
              onChange={handleInputChange2}
            />
            {suggestions2.length > 0 && (
              <ul className="list-group mt-2">
                {suggestions2.map((country, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick2(country)}
                    style={{ cursor: "pointer" }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-mg px-4">
            Submit
          </button>
        </div>
      </form>

      <div className="row">
        {result1 && (
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">
              <div className="card-body">
                <h5 className="card-title">{result1.name}</h5>
                <p className="card-text">
                  <strong>Population:</strong>{" "}
                  {result1.population.toLocaleString()}
                  <br />
                  <strong>Area:</strong>{" "}
                  {result1.area ? result1.area.toLocaleString() : "N/A"} km²
                  <br />
                  <strong>Capital:</strong> {result1.capital}
                  <br />
                  <strong>Region:</strong> {result1.region}
                  <br />
                  <strong>Subregion:</strong> {result1.subregion}
                  <br />
                  <strong>Languages:</strong> {result1.languages}
                </p>
              </div>
            </div>
          </div>
        )}

        {result2 && (
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">
              <div className="card-body">
                <h5 className="card-title">{result2.name}</h5>
                <p className="card-text">
                  <strong>Population:</strong>{" "}
                  {result2.population.toLocaleString()}
                  <br />
                  <strong>Area:</strong>{" "}
                  {result2.area ? result2.area.toLocaleString() : "N/A"} km²
                  <br />
                  <strong>Capital:</strong> {result2.capital}
                  <br />
                  <strong>Region:</strong> {result2.region}
                  <br />
                  <strong>Subregion:</strong> {result2.subregion}
                  <br />
                  <strong>Languages:</strong> {result2.languages}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
