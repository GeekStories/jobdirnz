import "./styles/Applications.css";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UserListings = ({ applications }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  console.log(user);

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

  return applications.map((application) => (
    <div key={application.id} className="applicationBox">
      <p>
        Position: {application.title} (
        <Link
          to={`/listing/${application.listingId}`}
          className="listingLinkBack"
        >
          View
        </Link>
        )
      </p>

      <div className="applicationStatus">
        Status:
        <p className={application.status ? "green" : "red"}>
          {application.status ? "Active" : "Not Active"}
        </p>
      </div>

      <div className="applicationDetails">
        <p>Name: {application.name}</p>
        <p>Email: {application.email}</p>
        <p>contact: {application.contact}</p>
      </div>

      {user.sub === application.userId && application.status && (
        <button
          className="deleteApplication"
          onClick={() => handleWithdraw(application.id)}
        >
          Withdraw application
        </button>
      )}

      {user.sub === application.userId && !application.status && (
        <button
          className="deleteApplication"
          onClick={() => handleDelete(application.id)}
        >
          Delete application
        </button>
      )}

      {user.sub === application.employerId && (
        <button
          className="deleteApplication"
          onClick={() => handleWithdraw(application.id)}
        >
          Close application
        </button>
      )}
    </div>
  ));
};

export default UserListings;
