import "./styles/home.css";

import Listings from "../Components/Home/listings";
import { useState, useEffect } from "react";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const GrabListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/listing`);
      const data = await response.json();
      setListings(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const SearchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/search/${search}`
        );
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 3) SearchListings();    
  }, [search]);

  useEffect(() => {
    GrabListings();
  }, [])

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
        {listings.length === 0 && "Keep typing or try different keywords :)"}
        {!isLoading && listings.length > 0 && <Listings listings={listings} />}
      </div>
    </div>
  );
};

export default Home;
