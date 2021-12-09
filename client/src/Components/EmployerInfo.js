import { useState, useEffect } from "react";

const EmployerInfo = ({ employerId }) => {
  const [employer, setInfo] = useState([]);

  useEffect(() => {
    const fetchEmployerInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/employer/${employerId}`
        );
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployerInfo();
  }, [employerId]);

  return <div>{employer.name}</div>;
};

export default EmployerInfo;
