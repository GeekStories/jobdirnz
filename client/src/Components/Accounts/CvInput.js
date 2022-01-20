const CvInput = ({handleSubmit, handleDelete, cvName, setSelectedFile }) => {
  return (
    <div className="cv">
      Current CV: {!cvName ? "Loading" : cvName}
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <input
          className="uploadField"
          type="file"
          name="cv"
          id="cv"
          accept="application/pdf"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          required
        />
        <div className="cvControls">
          <button type="submit" className="submitButton">
            Upload New CV
          </button>

          <button type="button" onClick={handleDelete} className="submitButton">
            Remove CV
          </button>
        </div>
      </form>
    </div>
  );
};

export default CvInput;
