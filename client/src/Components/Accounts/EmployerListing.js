import "./styles/employerListing.css";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const EmployerListing = ({ listing, listingApplicationsCount }) => {
  const closingDate = dayjs(listing.closingDate);
  return (
    <div className="employerListing">
      <p className="title">
        {listing.title} in {listing.city}
      </p>
      <p className="applicationsCount">
        {listingApplicationsCount} applications
      </p>
      <p className="closingDate">
        {new Date(listing.closingDate) < new Date()
          ? "Listing Expired"
          : `Applications close in ${closingDate.diff(dayjs(), 'day')} days`}
      </p>
      <p className="description">{listing.description.slice(0, 65)}...</p>
      <Link to={`/listing/${listing.id}`} className="listingLink">
        View or Edit..
      </Link>
    </div>
  );
};

export default EmployerListing;
