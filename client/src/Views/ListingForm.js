import "react-datepicker/dist/react-datepicker.css";
import "./styles/createForm.css";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";

import Cities from "../Data/nz.json";

const payTypeOptions = [
  { id: "tbd", label: "T.B.D" },
  { id: "oneoff", label: "One-Off" },
  { id: "hourly", label: "Hourly" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "Yearly", label: "Yearly" },
];

const positionTypeOptions = [
  { id: "tbd", label: "T.B.D" },
  { id: "fulltime", label: "Fulltime" },
  { id: "permanent", label: "Permanent" },
  { id: "temporary", label: "Temporary" },
  { id: "contract", label: "Contract" },
  { id: "casual", label: "Casual" },
  { id: "oneoff", label: "One-Off" },
];

const PostJob = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("Enter description here (max 1000 characters)");
  const [city, setCity] = useState("");
  const [closingDate, setClosingDate] = useState(new Date());
  const [payRate, setPayRate] = useState(0);
  const [payType, setPayType] = useState("Hourly");
  const [positionType, setPositionType] = useState("Full Time");
  const [employmentHours, setEmploymentHours] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();

    const body = {
      title,
      description,
      city,
      closingDate,
      positionType,
      payRate,
      payType,
      employmentHours,
      id,
    };

    const url = id
      ? `${process.env.REACT_APP_API_URL}/listing/update`
      : `${process.env.REACT_APP_API_URL}/listing`;

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201 || response.status === 204) {
      navigate("/account");
    } else {
      const result = await response.json();
      alert(result.validation.body.message);
    }
  };

  useEffect(() => {
    const GetListing = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/listing/${id}`
        );
        const data = await response.json();

        setTitle(data.title);
        setCity(data.city);
        setDescription(data.description);
        setClosingDate(data.closingDate);
        setPayRate(data.payRate);
        setPayType(data.payType);
        setPositionType(data.positionType);
        setEmploymentHours(data.employmentHours);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      setLoading(true);
      GetListing();
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="formWrapper">
      {isLoading && <p>Loading listing..</p>}
      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="title">Position Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              defaultValue={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}a
              maxLength={1000}
              required
            ></textarea>
          </div>
          <div className="inputGroup">
            <label htmlFor="city">(Nearest) City</label>
            <Select
              options={Cities}
              placeholder={city || "Select a value.."}
              searchable
              separator
              style={{ zIndex: 10 }}
              labelField="name"
              valueField="name"
              onChange={(e) => setCity(e[0].name)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="closingDate">Applications Deadline</label>
            <div className="closingDate">
              <DatePicker
                dateFormat="Pp"
                minDate={new Date()}
                selected={new Date(closingDate)}
                onChange={(e) => setClosingDate(e)}
                withPortal
                required
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="amount">Pay (0 for TBD)</label>
            <input
              type="number"
              className="amount"
              id="amount"
              name="amount"
              value={payRate}
              onChange={(e) => setPayRate(e.target.value)}
            />
            <label>Rate</label>
            <Select
              options={payTypeOptions}
              separator
              placeholder={payType || "Select a value.."}
              onChange={(e) => setPayType(e[0].label)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="positionType">Position</label>
            <Select
              options={positionTypeOptions}
              separator
              placeholder={
                String(positionType).charAt(0).toUpperCase() +
                  String(positionType).slice(1) || "Select a value.."
              }
              onChange={(e) => setPositionType(e[0].label)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="employmentHours">Hours (0 for TBD)</label>
            <input
              id="employmentHours"
              name="employmentHours"
              type="number"
              value={employmentHours}
              onChange={(e) => setEmploymentHours(e.target.value)}
            />
          </div>

          <button type="submit" className="submitButton">
            {id && "Update"}
            {!id && "Create"} Listing
          </button>
        </form>
      )}
    </div>
  );
};

export default PostJob;
