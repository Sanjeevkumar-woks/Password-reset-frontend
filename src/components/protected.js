import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../App";

export default function Protected() {
  const [log] = useContext(context);

  return (
    <>
      {log ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <div>
            <h1>Welcome to the Website🙂🙂🙂🙂</h1>
            <h1>You have Successfully Loged in 😉👍</h1>
          </div>
          <div>
            <NavLink to="/login">Go back to login</NavLink>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
