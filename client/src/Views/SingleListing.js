import "./styles/singleListing.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import GetDifference from "../Utils/TimeDifference";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const SingleListing = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [listingData, setListingData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth0();

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently();
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/listing/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (result.status === 200) navigate("/account");
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/${id}`
        );
        const data = await response.json();

        setListingData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, [id]);

  return (
    <>
      <div className="singleListing">
        {listingData !== [] ? (
          <>
            <div className="listingInfo">
              <p className="title">
                {listingData.title} in {listingData.city}
              </p>
              <p className="payInfo">
                Rate:{" "}
                {!isNaN(listingData.payRate) && listingData.payRate > 0
                  ? `$${parseInt(listingData.payRate).toLocaleString()} ${
                      listingData.payType
                    } | `
                  : "TBD | "}
                Hours: {" "}
                {!isNaN(listingData.employmentHours) &&
                listingData.employmentHours > 0
                  ? listingData.employmentHours
                  : "TBD"}
              </p>
              Closing Date: {new Date(listingData.closingDate).toLocaleString()}
              <p className="description">{listingData.description}</p>
              <p className="closingDate">
                Listing expires in {GetDifference(listingData.closingDate)} days
              </p>
            </div>
          </>
        ) : (
          <p className="listingNotFound">Listing not found</p>
        )}

        <div className="listingControls">
          {listingData !== [] && (
            <Link to={`/apply/${id}`} className="controlButton">
              Apply
            </Link>
          )}

          <button className="controlButton" onClick={() => navigate(-1)}>
            Back
          </button>

          {isAuthenticated && listingData.employerId === user.sub && (
            <button className="controlButton" onClick={handleDelete}>
              Delete
            </button>
          )}
          {isAuthenticated && listingData.employerId === user.sub && (
            <Link to={`/edit/${id}`} className="controlButton">
              Edit
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleListing;
