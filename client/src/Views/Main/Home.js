import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());

  const GrabListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/listing`);
      const data = await response.json();
      setListings(data);
    } catch(err) {
      alert("Error fetching listings");
    }
    setLoading(false);
  };

  const GetDifference = (end) => {
    const y = new Date(end);
    const r =
      Math.round(y.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24);

    return r;
  };

  useEffect(() => {
    setDateNow(new Date());
    GrabListings();
  }, []);

  return (
    <div className="home">
      <div className="center">
        {listings.length === 0 && isLoading && <div>Loading listings..</div>}

        {listings.length > 0 && 
          listings.filter(l => new Date(l.closingDate) > dateNow).map((listing) => (
            <div key={listing.id} className="listing">
              <p className="title">{listing.title}</p>
              <p className="closingDate">
                {GetDifference(listing.closingDate) > 0
                  ? `Expires in ${GetDifference(listing.closingDate).toFixed(
                      0
                    )} days`
                  : "Closed"}{" "}
              </p>
              <Link to={`/listing/${listing.id}`} className="listingButton">
                See more..
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
