import "./styles/hiring.css";

import TierBox from "../Components/Hiring/TierBox";
import Tier from "../Components/Hiring/Tier";

const Hiring = () => {
  const tierOneFeatures = [
    { label: "Cost (One-Off)", value: "$4.99" },
    { label: "Max. Listings", value: 10 },
    { label: "Bulk Response", value: "No" },
    { label: "Front Page Displays", value: "No" },
    { label: "Renewable Listings", value: "None" },
    { label: "Listings Auto Expire", value: "30 days" },
  ];

  const tierTwoFeatures = [
    { label: "Cost (One-Off)", value: "$19.99" },
    { label: "Max. Listings", value: 100 },
    { label: "Bulk Response", value: "Yes" },
    { label: "Front Page Displays", value: "No" },
    { label: "Renewable Listings", value: 5 },
    { label: "Listings Auto Expire", value: "60 days" },
  ];

  const tierThreeFeatures = [
    { label: "Cost (Recurring)", value: "$24.99" },
    { label: "Max. Listings", value: "Unlimited" },
    { label: "Bulk Response", value: "Yes" },
    { label: "Front Page Displays", value: "Yes" },
    { label: "Renewable Listings", value: "Unlimited" },
    { label: "Listings Auto Expire", value: "Custom" },
  ];

  return (
    <div className="hiring">
      <TierBox>
        <Tier level={1} features={tierOneFeatures} />
        <Tier level={2} features={tierTwoFeatures} />
        <Tier level={3} features={tierThreeFeatures} />
      </TierBox>


    </div>
  );
};

export default Hiring;
