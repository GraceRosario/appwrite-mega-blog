import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      //         user needs to be logged in but is not logged in

      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      /*
        second condition one only handles,
        user does not needs to be logged in but is logged in


        When they match, there's nothing to fix!

        For example:
        - Dashboard requires login + user is logged in → Let them in.
        - Login page doesn't require login + user is logged out → Let them in.
        */
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return (
    
      loader? <h1>Loading.....</h1> : <>{children}</>
  
  );
}

export default Protected;
