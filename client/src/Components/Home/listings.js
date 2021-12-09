import Listing from "./listing";

const Listings = ({listings}) => {
  return listings
    .filter((l) => new Date(l.closingDate) > new Date())
    .map((listing) => (
      <Listing key={listing.id} listing={listing} dateNow={new Date()} />
    ));
};

export default Listings;
