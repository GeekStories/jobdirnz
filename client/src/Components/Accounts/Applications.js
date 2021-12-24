import { Link } from "react-router-dom";

const Listings = ({ applications }) => {

  const handleDelete = () => {
    alert("wip");
  };

  return applications.map((application) => (
    <div key={application.id} className="applicationBox">
      <Link to={`/listing/${application.listingId}`} clasName="listingLinkBack">{application.title}</Link>
      <p>{application.name}</p>
      <p>{application.email}</p>
      <p>0{application.contact}</p>
      <button className="deleteApplication" onClick={handleDelete}>
        Remove application
      </button>
    </div>
  ));
};

export default Listings;
