import React, { useEffect, useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import image from "./pngwing.com.png";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Navbar = () => {
  let forgetpasscaptcha;
  let resetpasscaptcha="";
  const setforgetCaptchaRef = (ref) => {
    if (ref) {
      return forgetpasscaptcha= ref;
    }
  };
  function onChangeresetpass(value) {
    resetpasscaptcha=value;
  }
  const [details, setdetails] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    date: "",
  });
  const [user, setuser] = useState({
    currentpass: "",
    forgetpass: "",
    forgetcpass: "",
  });
  const refdetails = useRef(null);
  const refdel = useRef(null);
  const refclosedel = useRef(null);
  const refaccount = useRef(null);
  const refaccountclose = useRef(null);
  const refpass = useRef(null);
  const refpassclose = useRef(null);
  const a = useContext(noteContext);
  let history = useHistory();
  const ref = useRef(null);
  const refclose = useRef(null);
  const showalart = (massage, type) => {
    a.setAlart({
      msg: massage,
      types: type,
    });
    setTimeout(() => {
      a.setAlart(null);
    }, 1500);
  };
  const togglemode = () => {
    if (a.state.mode === "dark") {
      a.setState({
        mode: "light",
      });
      document.body.style.backgroundColor = "#c0f5ff";
      document.body.style.color = "black";
    } else {
      a.setState({
        mode: "dark",
      });
      document.body.style.backgroundColor = "#081f48";
      document.body.style.color = "white";
    }
  };
  const handleclick = () => {
    ref.current.click();
  };
  const handleclose = () => {
    refclose.current.click();
  };
  const handlechange = () => {
    refpass.current.click();
  };
  const handledelete = () => {
    refaccount.current.click();
  };
  const handlelogout = () => {
    refclosedel.current.click();
    showalart("Logout Successfully", "success");
    localStorage.removeItem("token");
    history.push("/");
  };
  const logout = () => {
    refdel.current.click();
  };
  const handlecloselogout = () => {
    refclose.current.click();
    refdel.current.click();
  };
  const handledetails = async () => {
    refdetails.current.click();
    const response = await fetch(
      `https://note-app-3-lfli.onrender.com/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setdetails({
      name: json.name,
      dob: json.dob,
      gender: json.gender,
      mobile: json.mobile,
      email: json.email,
      date: json.date,
    });
  };
  const handlepasschange = async () => {
    if (
      user.currentpass === "" ||
      user.forgetpass === "" ||
      user.forgetcpass === ""
    ) {
      showalart("Please fill all the details", "warning");
      forgetpasscaptcha.reset();
    } else if (user.forgetpass.length < 8) {
      showalart("Please fill password of atleast 8 character", "warning");
      forgetpasscaptcha.reset();
    }
    else if(resetpasscaptcha===""){
      showalart("Please Validate the captcha", "warning");
      forgetpasscaptcha.reset();
    } else if (user.forgetpass === user.forgetcpass) {
      const response = await fetch(
        `https://note-app-3-lfli.onrender.com/api/auth/changepass`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            currentpass: user.currentpass,
            password: user.forgetpass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("Password Change Successfully", "success");
        forgetpasscaptcha.reset();
        resetpasscaptcha="";
      } else {
        showalart("Enter Correct Current Password", "danger");
        forgetpasscaptcha.reset();
        resetpasscaptcha="";
      }
      setuser({ currentpass: "", forgetpass: "", forgetcpass: "" });
      refpassclose.current.click();
    } else {
      showalart(
        "Please give the same passord in passord and confirm password",
        "warning"
      );
      forgetpasscaptcha.reset();
    }
  };
  const onchangeforget = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const handleaccountdelete = async () => {
    refaccountclose.current.click();
    const response = await fetch(`https://note-app-3-lfli.onrender.com/api/auth/deleteuser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      showalart("Account Deleted Successfully", "success");
      localStorage.removeItem("token");
      history.push("/");
    }
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      <button
        ref={refpass}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalpass"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalpass"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: a.state.mode === "dark" ? "#165185" : "#e1ffff",
              color: a.state.mode === "dark" ? "white" : "black",
              boxShadow:
                a.state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Change Password
              </h1>
              <button
                ref={refpassclose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="currentpass"
                  name="currentpass"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.currentpass}
                />
                <label htmlFor="currentpass" style={{ color: "black" }}>
                  Current Password
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="forgetpass"
                  name="forgetpass"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.forgetpass}
                />
                <label htmlFor="forgetpass" style={{ color: "black" }}>
                  Password
                </label>
              </div>
              <div className="form-floating mb-3 my-3">
                <input
                  type="password"
                  className="form-control"
                  id="forgetcpass"
                  name="forgetcpass"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.forgetcpass}
                />
                <label htmlFor="forgetcpass" style={{ color: "black" }}>
                  Confirm Password
                </label>
              </div>
              <ReCAPTCHA ref={(r) => setforgetCaptchaRef(r) } sitekey="6LeItSMqAAAAAL73NtPX23w7lMrMCajqNk0CYDL2" onChange={onChangeresetpass} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refpassclose}
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${
                  a.state.mode === "dark" ? "info" : "dark"
                }`}
                onClick={handlepasschange}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={refaccount}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModaldelete"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModaldelete"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: a.state.mode === "dark" ? "#165185" : "#e1ffff",
              color: a.state.mode === "dark" ? "white" : "black",
              boxShadow:
                a.state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}
          >
            <div className="modal-body">
              <h4>Are you sure to Delete Account?</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refaccountclose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-${
                  a.state.mode === "dark" ? "info" : "dark"
                }`}
                onClick={handleaccountdelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={refdel}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: a.state.mode === "dark" ? "#165185" : "#e1ffff",
              color: a.state.mode === "dark" ? "white" : "black",
              boxShadow:
                a.state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}
          >
            <div className="modal-body">
              <h4>Are you sure to Logout?</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclosedel}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-${
                  a.state.mode === "dark" ? "info" : "dark"
                }`}
                onClick={handlelogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={refdetails}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: a.state.mode === "dark" ? "#165185" : "#e1ffff",
              color: a.state.mode === "dark" ? "white" : "black",
              boxShadow:
                a.state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}
          >
            <div className="modal-body">
              <h4>User Details</h4>
              <div style={{ width: "80%", marginLeft: "15px" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ fontSize: "100px", padding: "5pxs" }}>
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <h4>Hi {details.name} !</h4>
                  </div>
                </div>
                <div className="my-3">
                  <h6>Date of Birth : {details.dob}</h6>
                  <h6>Gender : {details.gender} </h6>
                  <h6>Mobile No. : {details.mobile} </h6>
                  <h6>Email id : {details.email} </h6>
                  <h6>
                    Register Date : {new Date(details.date).toGMTString()}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-${
          a.state.mode === "dark" ? "dark" : "info"
        } bg-${a.state.mode === "dark" ? "dark" : "info"} `}
      >
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to="/">
              <img
                src={image}
                alt="note"
                style={{
                  height: "37px",
                  width: "37px",
                  cursor: "pointer",
                  marginLeft: "5px",
                  marginRight: "-10px",
                }}
              />
            </Link>
            <Link
              className="navbar-brand"
              to={`${localStorage.getItem("token") ? "/home" : "/"}`}
            >
              iNotebook
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {localStorage.getItem("token") ? (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        localStorage.getItem("token")
                          ? location.pathname === "/"
                            ? "active"
                            : ""
                          : location.pathname === "/home"
                          ? "active"
                          : ""
                      } mt-1`}
                      aria-current="page"
                      to={`${localStorage.getItem("token") ? "/" : "/home"}`}
                    >
                      Home
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    } mt-1`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/contact" ? "active" : ""
                    } mt-1`}
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                {!localStorage.getItem("token") ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className={`btn btn-outline-${
                          a.state.mode === "dark" ? "info" : "dark"
                        } mx-1 mt-1`}
                        to="/login"
                        role="button"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`btn btn-outline-${
                          a.state.mode === "dark" ? "warning" : "secondary"
                        } mx-1 mt-1`}
                        to="/signup"
                        role="button"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`btn btn-outline-${
                        a.state.mode === "dark" ? "info" : "dark"
                      } mx-1 mt-1`}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="bg-transparent border-0 mx-2"
                onClick={togglemode}
                style={{
                  color: a.state.mode === "dark" ? "white" : "black",
                  fontSize: "20px",
                }}
              >
                {a.state.mode === "dark" ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
              </button>
              {localStorage.getItem("token") ? (
                <div className="dropdown">
                  <button
                    type="button"
                    className="bg-transparent me-2"
                    style={{
                      height: "37px",
                      width: "37px",
                      color: a.state.mode === "dark" ? "white" : "black",
                      fontSize: "20px",
                      border: "2px solid",
                      borderColor: a.state.mode === "dark" ? "white" : "black",
                      borderRadius: "50%",
                    }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item bg-transparent "
                        onClick={handledetails}
                      >
                        Account Details
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item bg-transparent "
                        onClick={handlechange}
                      >
                        Change Password
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item bg-transparent "
                        onClick={handledelete}
                        style={{ color: "red" }}
                      >
                        Delete Account
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleclick}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <button
        ref={ref}
        className="btn btn-primary d-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        Button with data-bs-target
      </button>

      <div
        className={`offcanvas offcanvas-start bg-${
          a.state.mode === "dark" ? "dark" : "info"
        }`}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            ref={refclose}
            type="button"
            className="btnclose bg-transparent border-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ fontSize: "25px" }}
          >
            <i
              className="fa-solid fa-xmark"
              style={{ color: a.state.mode === "dark" ? "white" : "black" }}
            ></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <center>
            <ul
              className={` navbar navbar-nav me-auto mb-2 mb-lg-0 navbar-${
                a.state.mode === "dark" ? "dark" : "info"
              }`}
            >
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link altnavlink ${
                      localStorage.getItem("token")
                        ? location.pathname === "/"
                          ? "active"
                          : ""
                        : location.pathname === "/home"
                        ? "active"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={handleclose}
                    to={`${localStorage.getItem("token") ? "/" : "/home"}`}
                  >
                    Home
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item">
                <Link
                  className={`nav-link altnavlink ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  onClick={handleclose}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link altnavlink ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  onClick={handleclose}
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
              {!localStorage.getItem("token") ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`btn btn-outline-${
                        a.state.mode === "dark" ? "info" : "dark"
                      } mx-2 mt-1`}
                      to="/login"
                      role="button"
                      onClick={handleclose}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`btn btn-outline-${
                        a.state.mode === "dark" ? "warning" : "secondary"
                      } mx-2 mt-1`}
                      to="/signup"
                      role="button"
                      onClick={handleclose}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    type="button"
                    className={`btn btn-outline-${
                      a.state.mode === "dark" ? "info" : "dark"
                    } mx-1 mt-1`}
                    onClick={handlecloselogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </center>
        </div>
      </div>
    </>
  );
};

export default Navbar;
