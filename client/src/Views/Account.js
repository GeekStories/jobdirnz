import "./styles/account.css";

import Applications from "../Components/Accounts/Applications";
import UserListings from "../Components/Accounts/UserListings";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Account = () => {
  const [isLoading, setLoading] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const [selectedFile, setSelectedFile] = useState();
  const [applications, setApplications] = useState([]);
  const [listings, setListings] = useState([]);
  const [cvName, setCVName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();

    if (!selectedFile) return;

    const data = new FormData();
    data.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/cv`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const accessToken = await getAccessTokenSilently();

          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/user`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const data = await response.json();
          data.applications.length > 0
            ? setApplications(
                user.sub === data.applications[0].userId
                  ? data.applications
                  : data.applications.filter((app) => app.status === true)
              )
            : console.log("no applications");

          setListings(data.listings);

          if (data.data[0].cvId === null) setCVName("Upload a CV!");
          else setCVName(data.data[0].originalName);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }, 1000);
    };

    fetchUserInfo();
  }, [getAccessTokenSilently, user.sub]);

  return (
    <>
      {isLoading && "Loading profile.."}
      {!isLoading && (
        <>
          <div className="cv">
            Current CV: {!cvName ? "Loading" : cvName}
            <form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <input
                className="uploadField"
                type="file"
                name="cv"
                id="cv"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
              <button type="submit" className="submitButton">
                Upload New CV
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="submitButton"
              >
                Remove CV
              </button>
            </form>
          </div>
          <div className="userApplications">
            <p>Your Applications</p>
            {!isLoading && applications.length === 0 && (
              <p className="noApps">No applications found</p>
            )}
            {!isLoading && <Applications applications={applications} />}
          </div>

          <div className="userListings">
            <p>Your Listings</p>
            {!isLoading && listings.length === 0 && (
              <p className="noListings">No listings found</p>
            )}
            {!isLoading && <UserListings listings={listings} />}
          </div>
        </>
      )}
    </>
  );
};

export default Account;
