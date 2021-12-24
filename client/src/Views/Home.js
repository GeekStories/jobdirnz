import "./styles/home.css";

import Listings from "../Components/Home/listings";
import { useState, useEffect } from "react";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
      } catch (err) {
        console.log(err);
      }
    }, 250);
    setLoading(false);
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
      <div className="left">
        <input
          type="text"
          className="searchInput"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a job listing"
        />
      </div>
      <div className="center">
        {!listings && "Keep typing or try different keywords :)"}
        {isLoading && <p>Loading job listings..</p>}
        {!isLoading && listings.length > 0 && <Listings listings={listings} />}
      </div>
    </div>
  );
};

export default Home;
