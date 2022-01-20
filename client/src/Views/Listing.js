import "./styles/singleListing.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

import { MdAttachMoney } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import dayjs from "dayjs";

const SingleListing = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [listingData, setListingData] = useState([]);
  const closingDate = dayjs(listingData.closingDate);
  const navigate = useNavigate();
  const { id } = useParams();


  const payInfo = {
    hours:
      !isNaN(listingData.employmentHours) && listingData.employmentHours > 0
        ? `${listingData.employmentHours}h p/w`
        : "TBD",
    pay:
      !isNaN(listingData.payRate) && listingData.payRate > 0
        ? `${parseInt(listingData.payRate).toLocaleString()} | ${
            listingData.payType
          }`
        : "TBD",
  };

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
    <div className="singleListing">
      <div className="employerControls">
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

      {listingData === [] && (
        <p className="listingNotFound">Listing not found</p>
      )}

      {listingData !== [] && (
        <div className="listingInfo">
          <p className="listingTitle">
            {listingData.title} in {listingData.city}
          </p>
          <div className="payInfo">
            <div className="payItem">
              <FcClock />
              <span className="hoursInfo">{payInfo.hours}</span>
            </div>
            <div className="payItem">
              <MdAttachMoney />
              <span className="amountInfo">{payInfo.pay}</span>
            </div>
          </div>
          <p className="listingClosingDate">
            Closing Date: {new Date(listingData.closingDate).toLocaleString()}
          </p>
          <p className="listingDescription">{listingData.description}</p>
          <p className="listingExpireyDate">
            Listing expires in {closingDate.diff(dayjs(), 'day')} days
          </p>
        </div>
      )}

      <div className="listingControls">
        {listingData !== [] &&
          (!isAuthenticated ||
            user["https://jobdir-access-control.com/roles"][0] !==
              "employer") && (
            <Link to={`/apply/${id}`} className="controlButton">
              Apply
            </Link>
          )}

        <button className="controlButton" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleListing;
