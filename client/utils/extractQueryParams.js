const extractQueryParams = (param) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  return params.get(param)
};

export default extractQueryParams;