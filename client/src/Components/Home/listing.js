import "./styles/listing.css";

import GetDifference from "../../Utils/TimeDifference";
import { Link } from "react-router-dom";

const Listing = ({ listing }) => {
  const difference = GetDifference(listing.closingDate);

  return (
    <>
      <div className="listing">
        <p className="title">{listing.title}</p>
        <p className="closingDate">
          {`Applications close in ${difference} days`}
        </p>
        <p className="description">{listing.description.slice(0, 65)}...</p>
        <Link to={`/listing/${listing.id}`} className="listingLink">
          See more or apply..
        </Link>
      </div>
    </>
  );
};

export default Listing;
