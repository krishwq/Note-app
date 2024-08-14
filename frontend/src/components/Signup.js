import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";
import PasswordChecklist from "react-password-checklist";

function Signup() {
  const [show1, setshow1] = useState("password");
  const [show2, setshow2] = useState("password");
  const [isverified, setisverified] = useState(false);
  const [issend, setissend] = useState(false);
  const [showcheckpass, setshowcheckpass] = useState(false);
  const [showcheckcpass, setshowcheckcpass] = useState(false);
  const [isverifypass, setisverifypass] = useState(false);
  const [isverifycpass, setisverifycpass] = useState(false);

  let signcaptcha;
  let signupcaptcha = "";
  const setsignCaptchaRef = (ref) => {
    if (ref) {
      return (signcaptcha = ref);
    }
  };
  function onChangesign(value) {
    signupcaptcha = value;
  }
  const context = useContext(noteContext);
  let history = useHistory();
  const { state, setAlart } = context;
  const [credent, setcredent] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    pass: "",
    cpass: "",
  });

  const showalart = (massage, type) => {
    setAlart({
      msg: massage,
      types: type,
    });
    setTimeout(() => {
      setAlart(null);
    }, 2000);
  };
  const [loading, setloading] = useState(false);
  const sendotp = async (e) => {
    const otp = Math.floor(Math.random() * 999999 + 100000);
    e.preventDefault();
    if (
      credent.name === "" ||
      credent.dob === "" ||
      credent.email === "" ||
      credent.gender === "" ||
      credent.mobile === ""
    ) {
      showalart("Please fill all the details", "warning");
    } else if (credent.name.length < 3) {
      showalart("Please enter name of atleast 3 character", "warning");
    } else if (credent.mobile.length < 10) {
      showalart("Please enter a valid 10 digit mobile number", "warning");
    } else {
      setloading(true);
      localStorage.setItem("otp", otp);
      const response = await fetch(
        `https://note-app-4-pdgm.onrender.com/api/sendmail/otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credent.name,
            userEmail: credent.email,
            otp: otp,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("OTP Send Successfully", "success");
        setissend(true);
      } else {
        showalart("Something went wrong please try again", "danger");
      }
      setloading(false);
    }
  };
  const verifyotp = (e) => {
    e.preventDefault();
    let sendedotp = localStorage.getItem("otp");
    const userotp = document.getElementById("otp");
    if (userotp.value === sendedotp) {
      showalart("Email Verified Successfully", "success");
      setisverified(true);
      localStorage.removeItem("otp");
    } else {
      showalart("Invalid OTP", "danger");
      setissend(false);
      localStorage.removeItem("otp");
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      credent.name === "" ||
      credent.dob === "" ||
      credent.email === "" ||
      credent.gender === "" ||
      credent.mobile === "" ||
      credent.pass === "" ||
      credent.cpass === ""
    ) {
      showalart("Please fill all the details", "warning");
      signcaptcha.reset();
    } else if (credent.name.length < 3) {
      showalart("Please enter name of atleast 3 character", "warning");
      signcaptcha.reset();
    } else if (credent.mobile.length < 10) {
      showalart("Please enter a valid 10 digit mobile number", "warning");
      signcaptcha.reset();
    } else if (credent.pass.length < 8) {
      showalart("Please enter a password of atleast 8 character", "warning");
      signcaptcha.reset();
    } else if (signupcaptcha === "") {
      showalart("Please Validate the captcha", "warning");
      signcaptcha.reset();
    }else if(!isverifypass || !isverifycpass){
      showalart("Password should contain UPPERCASE ,lowercase,number and special character", "warning");
      signcaptcha.reset();
    }
     else if (credent.pass === credent.cpass) {
      setloading(true);
      const response = await fetch(
        `https://note-app-4-pdgm.onrender.com/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credent.name,
            dob: credent.dob,
            gender: credent.gender,
            mobile: credent.mobile,
            email: credent.email,
            password: credent.pass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("Register Successfully", "success");
        setcredent({
          name: "",
          dob: "",
          gender: "",
          mobile: "",
          email: "",
          pass: "",
          cpass: "",
        });
        signupcaptcha = "";
        history.push("/login");
        signcaptcha.reset();
        setissend(false);
        setisverified(false);
      } else {
        showalart("Email already exist", "danger");
        signcaptcha.reset();
        signupcaptcha = "";
        setissend(false);
        setisverified(false);
      }
      setloading(false);
    } else {
      showalart(
        "Please give the same passord in passord and confirm password",
        "warning"
      );
      signcaptcha.reset();
    }
  };
  const onchange = (e) => {
    setcredent({ ...credent, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-5">
      <h3
        style={{ color: state.mode === "dark" ? "white" : "black" }}
        className="mb-5"
      >
        Signup
      </h3>
      <form onSubmit={handlesubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="name@example.com"
            onChange={onchange}
            value={credent.name}
          />
          <label htmlFor="name" style={{ color: "black" }}>
            Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            placeholder="name@example.com"
            onChange={onchange}
            value={credent.dob}
          />
          <label htmlFor="dob" style={{ color: "black" }}>
            Date of Birth
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
            placeholder="name@example.com"
            onChange={onchange}
            value={credent.gender}
          />
          <label htmlFor="gender" style={{ color: "black" }}>
            Gender
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            placeholder="name@example.com"
            onChange={onchange}
            value={credent.mobile}
          />
          <label htmlFor="mobile" style={{ color: "black" }}>
            Mobile
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={onchange}
            value={credent.email}
            disabled={isverified || issend}
          />
          <label htmlFor="email" style={{ color: "black" }}>
            Email address
          </label>
        </div>
        {isverified === true ? (
          <>
            <div className="form-floating mb-3">
              <input
                type={show1}
                className="form-control"
                id="pass"
                name="pass"
                placeholder="name@example.com"
                onChange={onchange}
                value={credent.pass}
                onFocus={() => {
                  setshowcheckpass(true);
                }}
                onBlur={() => {
                  setshowcheckpass(false);
                }}
              />
              <span
                className="hspass"
                onClick={() => {
                  if (show1 === "password") {
                    setshow1("text");
                  } else {
                    setshow1("password");
                  }
                }}
              >
                {show1 === "password" ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </span>
              <label htmlFor="pass" style={{ color: "black" }}>
                Password
              </label>
            </div>
            <PasswordChecklist
              className={showcheckpass === false ? "d-none" : ""}
              style={{marginBottom:"15px"}}
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={8}
              value={credent.pass}
              onChange={(isValid) => {
                setisverifypass(isValid);
              }}
            />
            <div className="form-floating mb-3">
              <input
                type={show2}
                className="form-control"
                id="cpass"
                name="cpass"
                placeholder="name@example.com"
                onChange={onchange}
                value={credent.cpass}
                onFocus={() => {
                  setshowcheckcpass(true);
                }}
                onBlur={() => {
                  setshowcheckcpass(false);
                }}
              />
              <span
                className="hspass"
                onClick={() => {
                  if (show2 === "password") {
                    setshow2("text");
                  } else {
                    setshow2("password");
                  }
                }}
              >
                {show2 === "password" ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </span>
              <label htmlFor="cpass" style={{ color: "black" }}>
                Confirm Password
              </label>
              <PasswordChecklist
              className={showcheckcpass === false ? "d-none" : ""}
              style={{marginBottom:"15px",marginTop:"15px"}}
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={8}
              value={credent.cpass}
              onChange={(isValid) => {
                setisverifycpass(isValid);
              }}
            />
            </div>
            <ReCAPTCHA
              ref={(r) => setsignCaptchaRef(r)}
              sitekey="6LeItSMqAAAAAL73NtPX23w7lMrMCajqNk0CYDL2"
              onChange={onChangesign}
            />
            <button
              type="submit"
              className={`btn btn-${
                state.mode === "dark" ? "info" : "dark"
              } my-3`}
            >
              {loading === true ? <Loader /> : ""}Register
            </button>
          </>
        ) : issend === false ? (
          <button
            type="button"
            className={`btn btn-${
              state.mode === "dark" ? "info" : "dark"
            } my-3`}
            onClick={sendotp}
          >
            {loading === true ? <Loader /> : ""}Send OTP
          </button>
        ) : (
          <>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="otp"
                name="otp"
                placeholder="Password"
              />
              <label htmlFor="otp" style={{ color: "black" }}>
                OTP
              </label>
            </div>
            <button
              type="button"
              className={`btn btn-${
                state.mode === "dark" ? "info" : "dark"
              } my-3`}
              onClick={verifyotp}
            >
              Verify OTP
            </button>
            <button
              type="button"
              className={`btn btn-${
                state.mode === "dark" ? "info" : "dark"
              } my-3 mx-3`}
              onClick={sendotp}
            >
              {loading === true ? <Loader /> : ""}Resend OTP
            </button>
            <button
              type="button"
              className={`btn btn-secondary my-3 `}
              onClick={()=>{setissend(false)}}
            >
              Cancel
            </button>
          </>
        )}
      </form>
      <h6 style={{ display: "inline" }}>Already have an account ?</h6>
      &nbsp;&nbsp;<Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
