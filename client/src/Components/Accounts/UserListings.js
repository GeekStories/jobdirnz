import "./styles/UserListings.css";
import Listing from "./Listing";

const UserListings = ({ listings }) => {
  return (
    <div className="listings">
      {listings
        .map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
    </div>
  );
};

export default UserListings;
