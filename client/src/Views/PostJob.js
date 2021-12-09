import "react-datepicker/dist/react-datepicker.css";
import "./styles/post.css";

import DatePicker from "react-datepicker";

const PostJob = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="formWrapper">
      <div className="inputGroup">
        <label htmlFor="title">Job Title</label>
        <input type="text" id="title" name="title" placeholder="title" />
      </div>

      <div className="inputGroup">
        <label htmlFor="description">Job/Work Description</label>
        <textarea name="description" id="description">
          Enter description here (max 1000 characters)
        </textarea>
      </div>
      <div className="inputGroup">
        <label htmlFor="city">Job Location</label>
        <input type="text" id="city" name="city" placeholder="city" />
      </div>
      <div className="inputGroup">
        <label htmlFor="listingClosingDate">Listing Closing</label>
        <div className="listingClosingDate">
          <DatePicker
            dateFormat="Pp"
            minDate={new Date()}
            selected={new Date()}
            required
          />
        </div>
      </div>
      <div className="inputGroup">
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="amount" placeholder="22.00" />
        <label htmlFor="payInfo">Rate</label>
        <select name="rate" id="rate">
          <option>Hourly</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Annually</option>
        </select>
      </div>
      <div className="inputGroup">
        <label htmlFor="positionType">Position</label>
        <select id="positionType" name="positionType">
          <option>Permanent</option>
          <option>Temp</option>
          <option>Contract</option>
        </select>
      </div>
      <div className="inputGroup">
        <label htmlFor="jobType">Type</label>
        <select id="jobType" name="jobType">
          <option>Full Time</option>
          <option>Temp</option>
          <option>Casual</option>
          <option>Casual</option>
          <option>Contract</option>
          <option>One-Off</option>
        </select>
      </div>

      <button type="submit" className="submitButton">Create Listing</button>
    </form>
  );
};

export default PostJob;
