import "./styles/home.css";

import Listings from "../Components/Home/listings";
import { useState, useEffect } from "react";
import Controls from "../Components/Home/controls";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [amountLoaded, setAmount] = useState(10);
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");

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
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }, 250);
  };

  const handleIncrease = () => {
    if (amountLoaded === listings.length) return;
    if (amountLoaded + 10 > listings.length) {
      setAmount(listings.length);
      return;
    }

    setAmount((amnt) => amnt + 10);
  };

  const handleReset = () => {
    setAmount(10);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const SearchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/search/${search}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length === 0) {
      GrabListings();
      return;
    }

    SearchListings();
  }, [search]);

  return (
    <div className="home">
      <input
        type="text"
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a job listing"
      />

      {isLoading && listings.length === 0 && (
        <p className="smallText">Loading listings..</p>
      )}
      {!isLoading && listings.length === 0 && (
        <p className="smallText">No results found</p>
      )}
      {!isLoading && listings.length !== 0 && (
        <>
          <Listings listings={listings} amountLoaded={amountLoaded} />

          <Controls
            listingsLength={listings.length}
            amountLoaded={amountLoaded}
            handleIncrease={handleIncrease}
            handleReset={handleReset}
          />
        </>
      )}
    </div>
  );
};

export default Home;
