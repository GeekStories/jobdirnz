import Listings from "../Components/Home/listings";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Account = () => {
  const [isLoading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [userListings, setInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/user`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [getAccessTokenSilently]);

  return (
    <>
      <div className="recentlyViewed">Recently viewed listings</div>
      <div className="userListings">
        {isLoading && "Loading profile.."}
        {!isLoading && <Listings listings={userListings} />}
        {!isLoading && userListings.length === 0 && "No listings found!"}
      </div>
    </>
  );
};

export default Account;
