import "./styles/listing.css";

import getWindowDimensions from "../../Utils/getWindowDimensions";
import { Link } from "react-router-dom";

import { MdAttachMoney } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import dayjs from "dayjs";

const Listing = ({ listing }) => {
  const closingDate = dayjs(listing.closingDate);
  const { width } = getWindowDimensions();

  const payInfo = {
    hours:
      !isNaN(listing.employmentHours) && listing.employmentHours > 0
        ? `${listing.employmentHours}h p/w`
        : "TBD",
    pay:
      !isNaN(listing.payRate) && listing.payRate > 0
        ? `${parseInt(listing.payRate).toLocaleString()} | ${listing.payType}`
        : "TBD",
  };

  return (
    <div className="listing">
      <p className="title">{listing.title}</p>
      <p className="city">
        <span className="positionType">
          {listing.positionType !== "tbd" && listing.positionType}
        </span>
        in {listing.city}
      </p>
      <div className="listingPayInfo">
        <div className="payItem">
          <FcClock />
          <span className="hoursInfo">{payInfo.hours}</span>
        </div>
        <div className="payItem">
          <MdAttachMoney />
          <span className="amountInfo">{payInfo.pay}</span>
        </div>
      </div>
      <p className="closingDate">
        {`Applications close in ${closingDate.diff(dayjs(), 'day')} days`}
      </p>
      <p className="description">
        {width > 425
          ? listing.description.slice(0, 300)
          : listing.description.slice(0, 100)}
        ...
      </p>
      <Link to={`/listing/${listing.id}`} className="listingLink">
        Read more or Apply
      </Link>
    </div>
  );
};

export default Listing;
