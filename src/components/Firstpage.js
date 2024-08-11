import React, { useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";

function Firstpage() {
  const a = useContext(noteContext);
  return (
    <div className="my-5">
      <center>
        <div className="intro">
          <h1 className="mb-4">The Simplest Way to Keep Notes</h1>
          <h5>
            All your notes,synced on all your devices.Get iNotebook now in your
            browser.
          </h5>
          {!localStorage.getItem("token") ? (
            <Link
              className={`btn btn-outline-${
                a.state.mode === "dark" ? "info" : "dark"
              } mx-1 mt-2`}
              to="/signup"
              role="button"
            >
              Signup
            </Link>
          ) : (
            ""
          )}
        </div>
      </center>
    </div>
  );
}

export default Firstpage;
