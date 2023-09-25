import jwt_decode from "jwt-decode";
const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const decoded = jwt_decode(token);
    const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const accountID = decoded["AccountId"];
    return { accountID: accountID, userRole: userRole };
  } else {
    return { accountID: null, userRole: null };;
  }
};
const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime; 
};
export { decodeToken, isTokenExpired };
