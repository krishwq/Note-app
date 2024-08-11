import React,{useContext} from "react";
import noteContext from "../context/Notes/noteContext";


function Contact() {
    const context = useContext(noteContext);
    const {state, setAlart } = context;
    const showalart=(massage,type)=>{
        setAlart({
            msg: massage,
            types: type,
          });
          setTimeout(() => {
            setAlart(null);
          }, 2000);
      }
    const handlesubmit= async (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);

    formData.append("access_key", "30439244-c6a5-49ff-8b84-711b48dc67f2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
        showalart("Message send successfully","success");
    }
    else{
        showalart("Something went wrong ! Please Try again later","danger");
    }
    document.getElementById('namecontact').value="";
    document.getElementById('emailcontact').value="";
    document.getElementById('message').value="";
    }
    
  return (
    <div className="my-5 contact-form">
      <h1>Contact With Us</h1>
      <p>Feel free to reach out to us with any questions and inquiries</p>
      <div className="contact mt-3">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="namecontact" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="namecontact"
              name="namecontact"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailcontact" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailcontact"
              name="emailcontact"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              name="message"
              id="message"
              rows="3"
              style={{ resize: "none" }}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`btn btn-${state.mode==="dark"?"info":"dark"} my-2`}
            style={{ width: "100%" }}
          >
            Send Message
          </button>
          <div className="my-1">We'll get back to you as soon as possible!</div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
