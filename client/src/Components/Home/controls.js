import "./styles/controls.css";

const Controls = ({ listingsLength, amountLoaded, handleIncrease, handleReset }) => {
  return (
    <div className="homePageControls">
      <p>Currently showing: {`${amountLoaded} / ${listingsLength}`}</p>

      {amountLoaded < listingsLength && (
        <button className="button loadMoreButton" onClick={handleIncrease}>
          Load More
        </button>
      )}

      {amountLoaded > 10 && (
        <button className="button resetButton" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Controls;
