import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  /*

    1. authService.logout()
This calls your authentication service.

Its job is to log the user out of Appwrite (the backend).

For example:
- Deletes the active authentication session.
- Ends the user's session on the server.
2. dispatch(logout())
This calls the Redux logout action.

Its job is to update the frontend's authentication state.

    */

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
