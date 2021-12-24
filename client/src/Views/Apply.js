import "./styles/apply.css";

import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Apply = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  const [cv, setCv] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  const [firstname, setFirstName] = useState(user.name.split(" ")[0] || "");
  const [lastname, setLastName] = useState(
    user.name.split(" ")[user.name.split(" ").length - 1] || ""
  );

  const [email, setEmail] = useState(user.email || "");
  const [contact, setContact] = useState(user.phone_number || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      cvId: cv.cvId,
      name: `${firstname} ${lastname}`,
      email,
      contact,
    };

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/listing/apply/${id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.status === 201) {
        navigate("/account");
      } else {
        const result = await response.json();
        console.log(result.validation.body.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.data.length > 0) setCv(data.data[0]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [getAccessTokenSilently]);

  return (
    !isLoading && (
      <form onSubmit={handleSubmit} className="formWrapper">
        <div className="inputGroup">
          <label htmlFor="title">First Name</label>
          <input
            type="text"
            defaultValue={firstname || ""}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="title">Last Name</label>
          <input
            type="text"
            defaultValue={lastname || ""}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="title">Email</label>
          <input
            type="text"
            defaultValue={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="title">Contact (Mobile)</label>
          <input
            type="tel"
            defaultValue={contact || ""}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <p className="selectedCvName">Selected CV: {cv.originalName}</p>
        <Link to="/account" className="changeCVLink">
          Change CV
        </Link>
        <button type="submit" className="sendApplicationButton">
          Send Application
        </button>
      </form>
    )
  );
};

export default Apply;
