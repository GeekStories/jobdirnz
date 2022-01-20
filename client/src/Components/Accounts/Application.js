import { Link } from "react-router-dom";

const Application = ({application, handleWithdraw, handleDelete, userSub}) => {
  return (
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

      {userSub === application.userId && application.status && (
        <button
          className="deleteApplication"
          onClick={() => handleWithdraw(application.id)}
        >
          Withdraw application
        </button>
      )}

      {userSub === application.userId && !application.status && (
        <button
          className="deleteApplication"
          onClick={() => handleDelete(application.id)}
        >
          Delete application
        </button>
      )}

      {userSub === application.employerId && (
        <button
          className="deleteApplication"
          onClick={() => handleWithdraw(application.id)}
        >
          Close application
        </button>
      )}
    </div>
  );
};

export default Application;
