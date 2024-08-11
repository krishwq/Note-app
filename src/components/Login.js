import React, { useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";

function Login() {
  const [show3, setshow3] = useState(<i className="fa-regular fa-eye"></i>);
  const [show4, setshow4] = useState("password");
  const [show5, setshow5] = useState("password");
  const [loading, setloading] = useState(false);
  let logincptcha = "";
  let logcaptcha;
  let forgetcaptcha;
  let resetcaptcha = "";
  const setlogCaptchaRef = (ref) => {
    if (ref) {
      return (logcaptcha = ref);
    }
  };
  const setforCaptchaRef = (ref) => {
    if (ref) {
      return (forgetcaptcha = ref);
    }
  };
  const ref = useRef();
  const refclose = useRef();
  const context = useContext(noteContext);
  const { state, setAlart } = context;
  const [credent, setcredent] = useState({ email: "", pass: "" });
  const [user, setuser] = useState({
    forgetemail: "",
    forgetpass: "",
    forgetcpass: "",
  });
  function onChangelogin(value) {
    logincptcha = value;
  }
  function onChangereset(value) {
    resetcaptcha = value;
  }
  let history = useHistory();
  const showalart = (massage, type) => {
    setAlart({
      msg: massage,
      types: type,
    });
    setTimeout(() => {
      setAlart(null);
    }, 2000);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (credent.email === "" || credent.pass === "") {
      showalart("Please fill all the details", "warning");
      logcaptcha.reset();
    } else if (logincptcha === "") {
      showalart("Please Validate the captcha", "warning");
      logcaptcha.reset();
    } else {
      setloading(true);
      const response = await fetch(
        `https://note-app-3-lfli.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credent.email,
            password: credent.pass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("Login Successfully", "success");
        localStorage.setItem("token", json.authtoken);
        logincptcha = "";
        logcaptcha.reset();
        history.push("/");
      } else {
        showalart("Please Login with correct credential", "danger");
        logincptcha = "";
        logcaptcha.reset();
      }
      setloading(false);
    }
  };
  const handleforget = async (e) => {
    e.preventDefault();
    if (
      user.forgetemail === "" ||
      user.forgetpass === "" ||
      user.forgetcpass === ""
    ) {
      showalart("Please fill all the details", "warning");
      forgetcaptcha.reset();
    } else if (user.forgetpass.length < 8) {
      showalart("Please fill password of atleast 8 character", "warning");
      forgetcaptcha.reset();
    } else if (resetcaptcha === "") {
      showalart("Please Validate the captcha", "warning");
      forgetcaptcha.reset();
    } else if (user.forgetpass === user.forgetcpass) {
      const response = await fetch(
        `https://note-app-3-lfli.onrender.com/api/auth/forgetpass`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.forgetemail,
            password: user.forgetpass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("Password Reset Successfully", "success");
        resetcaptcha = "";
        forgetcaptcha.reset();
      } else {
        showalart("Email Not Found", "danger");
        resetcaptcha = "";
        forgetcaptcha.reset();
      }
      setuser({ forgetemail: "", forgetpass: "", forgetcpass: "" });

      refclose.current.click();
    } else {
      showalart(
        "Please give the same passord in passord and confirm password",
        "warning"
      );
      forgetcaptcha.reset();
    }
  };
  const resetpass = () => {
    ref.current.click();
  };
  const onchangeforget = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const onchange = (e) => {
    setcredent({ ...credent, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              backgroundColor: state.mode === "dark" ? "#165185" : "#e1ffff",
              color: state.mode === "dark" ? "white" : "black",
              boxShadow:
                state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Reset Password
              </h1>
              <button
                ref={refclose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="forgetemail"
                  name="forgetemail"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.forgetemail}
                />
                <label htmlFor="forgetemail" style={{ color: "black" }}>
                  Email Address
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type={show4}
                  className="form-control"
                  id="forgetpass"
                  name="forgetpass"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.forgetpass}
                />
                <span
                  className="hspass"
                  onClick={() => {
                    if (show4 === "password") {
                      setshow4("text");
                    } else {
                      setshow4("password");
                    }
                  }}
                >
                  {show4==="password"?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}
                </span>
                <label htmlFor="forgetpass" style={{ color: "black" }}>
                  Password
                </label>
              </div>
              <div className="form-floating mb-3 my-3">
                <input
                  type={show5}
                  className="form-control"
                  id="forgetcpass"
                  name="forgetcpass"
                  placeholder="name@example.com"
                  onChange={onchangeforget}
                  value={user.forgetcpass}
                />
                <span
                  className="hspass"
                  onClick={() => {
                    if (show5 === "password") {
                      setshow5("text");
                    } else {
                      setshow5("password");
                    }
                  }}
                >
                  {show5==="password"?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}
                </span>
                <label htmlFor="forgetcpass" style={{ color: "black" }}>
                  Confirm Password
                </label>
              </div>
              <ReCAPTCHA
                ref={(r) => setforCaptchaRef(r)}
                sitekey="6LeItSMqAAAAAL73NtPX23w7lMrMCajqNk0CYDL2"
                onChange={onChangereset}
              />
              
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${state.mode === "dark" ? "info" : "dark"}`}
                onClick={handleforget}
              >
                Reset
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h3
          style={{ color: state.mode === "dark" ? "white" : "black" }}
          className="mb-5"
        >
          Login
        </h3>
        <form onSubmit={handlesubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              onChange={onchange}
              value={credent.email}
            />
            <label htmlFor="email" style={{ color: "black" }}>
              Email address
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="pass"
              name="pass"
              placeholder="name@example.com"
              onChange={onchange}
              value={credent.pass}
            />
            <span
              className="hspass"
              onClick={() => {
                let x = document.getElementById("pass");
                if (x.type === "password") {
                  x.type = "text";
                  setshow3(<i className="fa-regular fa-eye-slash"></i>);
                } else {
                  x.type = "password";
                  setshow3(<i className="fa-regular fa-eye"></i>);
                }
              }}
            >
              {show3}
            </span>
            <label htmlFor="pass" style={{ color: "black" }}>
              Password
            </label>
          </div>
          <ReCAPTCHA
            ref={(r) => setlogCaptchaRef(r)}
            sitekey="6LeItSMqAAAAAL73NtPX23w7lMrMCajqNk0CYDL2"
            onChange={onChangelogin}
          />
          <button
            type="submit"
            className={`btn btn-${
              state.mode === "dark" ? "info" : "dark"
            } my-3`}
          >
            {loading===true?<Loader/>:""}Login
          </button>
        </form>
        <br />
        <h6 style={{ display: "inline" }}>Dont't have an account ?</h6>
        &nbsp;&nbsp;<Link to="/signup">Signup</Link>
        <br /> <h6 style={{ display: "inline" }}>Forget Password ?</h6>
        &nbsp;&nbsp;
        <Link to="/login" onClick={resetpass}>
          Reset Password
        </Link>
      </div>
    </>
  );
}

export default Login;
