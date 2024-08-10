import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";

function Addnote() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const showalart=(massage,type)=>{
    setAlart({
        msg: massage,
        types: type,
      });
      setTimeout(() => {
        setAlart(null);
      }, 2000);
  }
  const context = useContext(noteContext);
  const { state,addnote,setAlart } = context;
  const handleclick = () => {
    if(note.title==="" || note.description===""|| note.tag===""){
        showalart("Please fill Title,Description and Tag","warning");
    }else if( note.title.length<5 || note.description.length<5){
      showalart("Please fill Atleast 5 character at Title and Description", "warning");
    }
    else{
    addnote(note.title, note.description, note.tag);
    showalart("Notes Added Successfully","success");
    setnote({
        title: "",
        description: "",
        tag: "",
      })
}
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-5">
        <h2>Add a Note </h2>
        <form className="my-3" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="name@example.com"
              onChange={onchange}
              value={note.title}
            />
            <label htmlFor="title" style={{ color: "black" }}>
              Title:
            </label>
          </div>

          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="description"
              name="description"
              style={{ height: "100px", resize: "none" }}
              onChange={onchange}
              value={note.description}
            ></textarea>
            <label htmlFor="description" style={{ color: "black" }}>
              Description:
            </label>
          </div>
          <div className="form-floating mb-3 my-3">
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="name@example.com"
              onChange={onchange}
              value={note.tag}
            />
            <label htmlFor="tag" style={{ color: "black" }}>
              Tag:
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-${state.mode==="dark"?"info":"dark"} my-3`}
            onClick={handleclick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
