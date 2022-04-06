import React from "react";
import { NavLink } from "react-router-dom";

export default function Emailsent() {
  return (<>
    <div className="d-flex justify-content-center mt-5">
      <h1>Link sent Succesfully👍. Please check your Email</h1>
    </div>
    <div>
    <NavLink to="/login">Go back to login</NavLink>
  </div>
  </>
  );
}
