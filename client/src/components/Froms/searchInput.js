import React, { useState } from "react"; // Import useState
import { useSearch } from "../../context/seacrh";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(""); // Define keyword using useState

  // handle submit
  const handleSubmitInput = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search-product/${keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search", );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmitInput}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={keyword} // Use keyword here
          onChange={(e) => setKeyword(e.target.value)} // Update keyword using setKeyword
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
