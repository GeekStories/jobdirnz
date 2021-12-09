import "./styles/signup.css";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="signUpForm" onSubmit={handleSubmit}>
      Company Name
      <input type="text" className="signUpInput" placeholder="Awesome Inc." required/>

      Region
      <select className="signUpInput">
        <option value="1">Auckland</option>
        <option value="2">Wellington</option>
        <option value="3">Christchurch</option>
      </select>

      Main Industry
      <select className="signUpInput">
        <option value="1">Mining</option>
        <option value="2">Accounting</option>
        <option value="3">Business</option>
      </select>

      Direct Contact (email/tel)
      <input type="text" className="signUpInput" placeholder="eg: hr@email.com" />

      Brief Description
      <textarea type="text" className="signUpInput">Awesome Inc is awesome</textarea>

      <button type="submit" className="submitBtn">Submit Application!</button>
      <p>Applications shouldn't take more than 24 hours to process.</p>
    </form>
  );
};

export default SignUp;
