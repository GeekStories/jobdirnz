import "./styles/singleListing.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import GetDifference from "../../Utils/TimeDifference";
import { useState, useEffect } from "react";
import EmployerInfo from "../EmployerInfo";

const SingleListing = () => {
  const [listingData, setListingData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
              <p className="title">{listingData.title}</p>
              <p className="description">{listingData.description}</p>
              <p className="closingDate">
                Listing expires in {GetDifference(listingData.closingDate)} days
              </p>
              {new Date(listingData.closingDate).toLocaleString()}
              <p className="payInfo">
                Rate: ${Number(listingData.payRate).toLocaleString()}{" "}
                {listingData.payType}
              </p>
            </div>
            <EmployerInfo id={listingData.employerId} />
          </>
        ) : (
          <p className="listingNotFound">Listing not found</p>
        )}

        {listingData !== [] && (
          <Link to={`/apply/${id}`} className="apply">
            Apply
          </Link>
        )}

        <button className="back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </>
  );
};

export default SingleListing;
