import "./styles/contact.css";

import Select from "react-dropdown-select";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("general");
  const [accountNumber, setAccountNumber] = useState(null);
  const [message, setMessage] = useState("");

  const contactTypes = [
    { id: "1", label: "General" },
    { id: "2", label: "Request Account Deletion" },
    { id: "3", label: "Corporate" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email,
        accountNumber,
        type,
        message,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        body: body,
      });
      if (response.status === 200) Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contactWrapper">
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label>Email</label>

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>

        <div className="inputGroup">
          <label>Account # (Optional)</label>

          <input
            type="text"
            onChange={(e) => setAccountNumber(e.target.value)}
          ></input>
        </div>
        <div className="inputGroup">
          <label>Contact Reason</label>
          <Select
            options={contactTypes}
            searchable={false}
            separator
            onChange={(e) => setType(e[0].label)}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            required
          ></textarea>
        </div>

        <button className="sendContactButton">Send</button>
      </form>
    </div>
  );
};

export default Contact;
