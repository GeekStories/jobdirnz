import "./styles/employerListings.css";

import EmployerListing from "./EmployerListing";

const EmployerListings = ({ listings, applications }) => {
  return (
    <>
      <p>Your Listings</p>
      <div className="employerListingsWrapper">
        {listings.length === 0 && (
          <p className="smallText">No listings found</p>
        )}
        {listings.map((listing) => (
          <EmployerListing
            key={listing.id}
            listing={listing}
            listingApplications={
              applications.filter((app) => app.listingId === listing.id).length
            }
          />
        ))}
      </div>
    </>
  );
};

export default EmployerListings;
