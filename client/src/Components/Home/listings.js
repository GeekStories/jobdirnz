import "./styles/listings.css";
import Listing from "./listing";

const Listings = ({ listings, amountLoaded }) => {
  return (
    <div className="listings">
      {listings
        .filter((l) => new Date(l.closingDate) > new Date())
        .slice(0, amountLoaded)
        .map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
    </div>
  );
};

export default Listings;
