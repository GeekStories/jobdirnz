const GetDifference = (end) => {
  return Math.ceil(Math.abs(new Date(end) - new Date()) / (1000 * 60 * 60 * 24));
};

export default GetDifference;