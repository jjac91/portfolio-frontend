import React from "react";
import { Link } from "react-router-dom";

function SavedLocation({ id, label, username, remove }) {
  function handleDelete() {
    remove(id);
  }
  return (
    <li>
      <Link to={`/location/${username}/${id}`}>{label}</Link>
      <button onClick={handleDelete}>Delete Location</button>
    </li>
  );
}

export default SavedLocation;
