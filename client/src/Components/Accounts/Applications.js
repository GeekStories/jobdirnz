import "./styles/Applications.css";

import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-dropdown-select";
import Application from "./Application";
import { useState } from "react";

const UserListings = ({ applications, userListings, isEmployer }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [filterId, setFilterId] = useState("");

  const handleWithdraw = async (id) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/${id}`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 204) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 204) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEmployer && (
        <div className="employerApplications">
          <p>Filter Applications by Listing</p>
          <div className="filterApplications">
            <Select
              options={userListings}
              placeholder="Select a listing.."
              onChange={(e) => setFilterId(e[0].id)}
            />
          </div>

          {(filterId === "default" || filterId === "") && (
            <p className="smallText">
              Currently {applications.length} applications
            </p>
          )}

          {filterId !== "" &&
            filterId !== "default" &&
            applications
              .filter((app) => app.listingId === filterId)
              .map((application) => (
                <Application
                  application={application}
                  handleWithdraw={handleWithdraw}
                  handleDelete={handleDelete}
                  userSub={user.sub}
                />
              ))}
        </div>
      )}

      {!isEmployer && (
        <div className="userApplications">
          <p>Your Applications</p>

          {applications.map((application) => (
            <Application
              application={application}
              handleWithdraw={handleWithdraw}
              handleDelete={handleDelete}
              userSub={user.sub}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserListings;
