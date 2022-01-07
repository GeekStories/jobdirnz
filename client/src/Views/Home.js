import "./styles/home.css";

import Listings from "../Components/Home/listings";
import { useState, useEffect } from "react";
import Listing from "../Components/Home/listing";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [amountLoaded, setAmount] = useState(5);

  const GrabListings = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing`
        );
        if (response.status === 200) {
          const data = await response.json();
          setListings(data);
        }
      } catch (err) {
        console.log(err);
      }
    }, 250);
    setLoading(false);
  };

  const handleIncrease = () => {
    if (amountLoaded === listings.length) return;
    setAmount((x) => x + 10);
  };

  const handleReset = () => {
    setAmount((amnt) => (amnt = 5));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const SearchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/search/${search}`
        );
        const data = await response.json();

        if (response.status === 200) {
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 3) SearchListings();
  }, [search]);

  useEffect(() => {
    if (search.length === 0) GrabListings();
  }, [search.length]);

  return (
    <div className="home">
      <input
        type="text"
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a job listing"
      />

      {!listings && "Keep typing or try different keywords :)"}
      {isLoading && <p>Loading job listings..</p>}

      {!isLoading && listings.length > 0 && (
        <>
          <Listings>
            {listings
              .slice(0, amountLoaded)
              .filter((l) => new Date(l.closingDate) > new Date())
              .map((listing) => (
                <Listing key={listing.id} listing={listing} />
              ))}
          </Listings>

          <div className="homePageControls">
            <p>
              Currently showing:{" "}
              {amountLoaded === listings.length
                ? listings.length
                : `${amountLoaded} / ${listings.length}`}
            </p>

            {amountLoaded < listings.length && (
              <button className="loadMoreButton" onClick={handleIncrease}>
                Load More
              </button>
            )}

            {amountLoaded > 20 && (
              <button className="resetButton" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
