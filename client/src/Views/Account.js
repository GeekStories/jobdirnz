import "./styles/account.css";

import EmployerListings from "../Components/Accounts/EmployerListings";
import Applications from "../Components/Accounts/Applications";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import CvInput from "../Components/Accounts/CvInput";

const Account = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [selectedFile, setSelectedFile] = useState();
  const [applications, setApplications] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [cvName, setCVName] = useState("");

  const isEmployer =
    user["https://jobdir-access-control.com/roles"][0] === "employer";
  const userListings = listings.map((listing) => {
    return { id: listing.id, label: `${listing.title} - ${listing.city}` };
  });
  userListings.push({ id: "default", label: "None" });

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
    <div className="accountWrapper">
      {!isLoading && !isEmployer && (
        <>
          <CvInput
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            setSelectedFile={setSelectedFile}
            cvName={cvName}
          />
          <Applications applications={applications} isEmployer={isEmployer} />
        </>
      )}

      {!isLoading && isEmployer && (
        <>
          <Applications
            applications={applications}
            userListings={userListings}
            isEmployer={isEmployer}
          />
          <EmployerListings listings={listings} applications={applications} />
        </>
      )}
    </div>
  );
};

export default Account;
