import "./styles/listing.css";
import { Link } from "react-router-dom";
import GetDifference from "../../Utils/TimeDifference";

const Listing = ({ listing }) => {
  return (
    <div className="listing">
      <p className="title">{listing.title}</p>
      <p className="closingDate">
        {new Date(listing.closingDate) < new Date()
          ? "Listing Expired"
          : `Applications close in ${GetDifference(listing.closingDate)} days`}
      </p>
      <p className="description">{listing.description.slice(0, 65)}...</p>
      <Link to={`/listing/${listing.id}`} className="listingLink">
        View or Edit..
      </Link>
    </div>
  );
};

export default Listing;
