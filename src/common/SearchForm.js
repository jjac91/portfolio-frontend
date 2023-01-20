import React, { useState } from "react";

/**General search bar
 *
 * Used for search queries in the app
 *
 * This compomonent doesn't do any searching on its own,
 * it simply renders the search bar and calls the provided
 * searchFor function provided by a parent component.
 */

function SearchForm({ searchFor, placeHolder }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    // prevents searcing for only white spaces and trims off extra whitepace
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-3 mt-1.5 ml-3 mr-3">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="searchTerm"
          placeholder={placeHolder}
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm