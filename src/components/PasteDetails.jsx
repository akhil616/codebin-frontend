import React from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const PasteDetails = ({ paste }) => {
  return (
    <div className="pastes-details">
      <h4>
        <Link to={`/${paste._id}`}>{paste.title}</Link>
      </h4>
      <p>
        {formatDistanceToNow(new Date(paste.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default PasteDetails;
