import "./styles/listings.css";

import Listing from "./listing";

const Listings = ({ listings }) => {
  return (
    <div className="listings">
      {listings
        .filter((l) => new Date(l.closingDate) > new Date())
        .map((listing) => (
          <Listing key={listing.id} listing={listing} dateNow={new Date()} />
        ))}
    </div>
  );
};

export default Listings;
