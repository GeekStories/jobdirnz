import "./styles/Tier.css";

const Tier = ({ level, features }) => {
  return (
    <table className="Tier">
      <thead>
        <tr>
          <th className="tierTitle">Tier {level}</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature, i) => {
          return (
            <tr key={`tier${level}-${feature.label}-${i}`}>
              <td>{feature.label}</td>
              <td>{feature.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tier;
