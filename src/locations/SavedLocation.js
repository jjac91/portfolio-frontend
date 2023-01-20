import React from "react";
import { Link } from "react-router-dom";

function SavedLocation({ id, label, username, remove }) {
  function handleDelete() {
    remove(id);
  }
  return (
    <div className="mt-2 mb-2">
      <Link to={`/location/${username}/${id}`}>
        <h3 className="locLink mb-1.5 mt-3 ml-3 mr-3">{label}</h3>
      </Link>
      <button
        type="button"
        className="btn btn-primary btn-sm mb-3 mt-1.5 ml-3 mr-3"
        onClick={handleDelete}
      >
        Delete Location
      </button>
    </div>
  );
}

export default SavedLocation;
