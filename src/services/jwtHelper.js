import jwt_decode from "jwt-decode";

const decodeToken = async () => {
  const token = await localStorage.getItem("token");

  if (token !== null) {
    const decoded = await jwt_decode(token);

    const userRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const accountID = decoded["AccountID"];
    return { accountID: accountID, userRole: userRole };
  } else {
    return null;
  }
};

export { decodeToken };
