import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";

function Signup() {
  const context = useContext(noteContext);
  let history=useHistory();
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
  const handlesubmit = async (e) => {
    e.preventDefault();
    if(credent.name==="" || credent.dob===""||credent.email===""|| credent.gender===""||credent.mobile===""||credent.pass===""||credent.cpass===""){
      showalart("Please fill all the details", "warning");
    }
    else if(credent.name.length<3){
      showalart("Please enter name of atleast 3 character", "warning");
    }else if(credent.mobile.length<10){
      showalart("Please enter a valid 10 digit mobile number", "warning");
    }else if(credent.pass.length<8){
      showalart("Please enter a password of atleast 8 character", "warning");
    }
   else if (credent.pass === credent.cpass) {
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
        setcredent({ name: "",
          dob: "",
          gender: "",
          mobile: "",
          email: "",
          pass: "",
          cpass: "",})
         history.push("/login")
      } else {
        showalart("Email already exist", "danger");
      }
    }else{
      showalart("Please give the same passord in passord and confirm password", "warning");
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
          <label htmlFor="cpass" style={{ color: "black" }}>
            Confirm Password
          </label>
        </div>
        <button type="submit" className={`btn btn-${state.mode==="dark"?"info":"dark"} my-3`}>
          Register
        </button>
      </form>
      <h6 style={{display:"inline"}}>Already have an account ?</h6>&nbsp;&nbsp;<Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
