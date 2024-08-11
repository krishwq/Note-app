import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";

function Signup() {
  const [show1, setshow1] = useState(<i className="fa-regular fa-eye"></i>);
  const [show2, setshow2] = useState(<i className="fa-regular fa-eye"></i>);
  const [isverified, setisverified] = useState(false);
  const [issend, setissend] = useState(false);
  let otp=Math.floor((Math.random() * 999999) + 100000);
 
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
  const sendotp=async(e)=>{
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
    } 
    else{
      setloading(true);
      const response = await fetch(
        `https://note-app-3-lfli.onrender.com/api/sendmail/otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credent.name,
            userEmail: credent.email,
            otp:otp,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        showalart("OTP Send Successfully", "success");
        setissend(true);
      } else {
        showalart("Email not found", "danger");
      }
      setloading(false);
    }
  }
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
    } else if (credent.pass === credent.cpass) {
      setloading(true);
      const response = await fetch(
        `https://note-app-3-lfli.onrender.com/api/auth/createuser`,
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
      } else {
        showalart("Email already exist", "danger");
        signcaptcha.reset();
        signupcaptcha = "";
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
          />
          <label htmlFor="email" style={{ color: "black" }}>
            Email address
          </label>
        </div>
        {isverified === true ? (
          <>
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
                    setshow1(<i className="fa-regular fa-eye-slash"></i>);
                  } else {
                    x.type = "password";
                    setshow1(<i className="fa-regular fa-eye"></i>);
                  }
                }}
              >
                {show1}
              </span>
              <label htmlFor="pass" style={{ color: "black" }}>
                Password
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="cpass"
                name="cpass"
                placeholder="name@example.com"
                onChange={onchange}
                value={credent.cpass}
              />
              <span
                className="hspass"
                onClick={() => {
                  let x = document.getElementById("cpass");
                  if (x.type === "password") {
                    x.type = "text";
                    setshow2(<i className="fa-regular fa-eye-slash"></i>);
                  } else {
                    x.type = "password";
                    setshow2(<i className="fa-regular fa-eye"></i>);
                  }
                }}
              >
                {show2}
              </span>
              <label htmlFor="cpass" style={{ color: "black" }}>
                Confirm Password
              </label>
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
        ) : (
          issend===false?<button
          type="button"
          className={`btn btn-${
            state.mode === "dark" ? "info" : "dark"
          } my-3`}
           onClick={sendotp}
        >
          {loading === true ? <Loader /> : ""}Send OTP
        </button>
        :<>
        <div className="form-floating">
  <input type="password" className="form-control" id="otp" name="otp" placeholder="Password"/>
  <label htmlFor="otp" style={{ color: "black" }}>OTP</label>
</div>
        <button
          type="button"
          className={`btn btn-${
            state.mode === "dark" ? "info" : "dark"
          } my-3`}
        >
          Verify OTP
        </button>
        </>)}
      </form>
      <h6 style={{ display: "inline" }}>Already have an account ?</h6>
      &nbsp;&nbsp;<Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
