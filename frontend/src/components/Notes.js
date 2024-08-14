import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useHistory } from "react-router-dom";

function Notes() {
  let history=useHistory();
  const [notes, setnotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [deleten, setdeleten] = useState({
    delid:"",
  });
  const context = useContext(noteContext);
  const { note, getnote, setAlart, editnote, state,deletenote } = context;
  useEffect(() => {
    setTimeout(() => {
      if(localStorage.getItem('token')){
        getnote();
      }else{
      window.location.reload();
      history.push("/");
      }
    }, 100);
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updatenote = (currentnote) => {
    ref.current.click();
    setnotes({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const deletenotes = (currentnote) => {
    refdel.current.click();
    setdeleten({
      delid: currentnote._id,
    })
  };
  const ref = useRef(null);
  const refclose = useRef(null);
  const refclosedel = useRef(null);
  const refdel = useRef(null);
  const onchange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value });
  };
  const showalart = (massage, type) => {
    setAlart({
      msg: massage,
      types: type,
    });
    setTimeout(() => {
      setAlart(null);
    }, 2000);
  };
  const handleclick = () => {
    if (notes.etitle === "" || notes.edescription === "" || notes.etag === "") {
      showalart("Please fill Title,Description and Tag", "warning");
    }else if( notes.etitle.length<5 || notes.edescription.length<5){
      showalart("Please fill Atleast 5 character at Title and Description", "warning");
    }
     else {
      editnote(notes.id, notes.etitle, notes.edescription, notes.etag);
      refclose.current.click();
      showalart("Notes Updated Successfully", "success");
    }
  };
  const handledel=()=>{
   deletenote(deleten.delid);
   refclosedel.current.click();
   showalart("Notes Deleted Successfully", "success");
  }
  return (
   
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
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
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  placeholder="name@example.com"
                  onChange={onchange}
                  value={notes.etitle}
                />
                <label htmlFor="etitle" style={{ color: "black" }}>
                  Title:
                </label>
              </div>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="edescription"
                  name="edescription"
                  style={{ height: "100px", resize: "none" }}
                  onChange={onchange}
                  value={notes.edescription}
                ></textarea>
                <label htmlFor="edescription" style={{ color: "black" }}>
                  Description:
                </label>
              </div>
              <div className="form-floating mb-3 my-3">
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  placeholder="name@example.com"
                  onChange={onchange}
                  value={notes.etag}
                />
                <label htmlFor="etag" style={{ color: "black" }}>
                  Tag:
                </label>
              </div>
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
                className={`btn btn-${state.mode==="dark"?"info":"dark"}`}
                onClick={handleclick}
              >
                Update Notes
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
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{
              backgroundColor: state.mode === "dark" ? "#165185" : "#e1ffff",
              color: state.mode === "dark" ? "white" : "black",
              boxShadow:
                state.mode === "dark"
                  ? "0px 0px 8px 0.5px white"
                  : "0px 0px 10px 1px black",
            }}>
            <div className="modal-body">
             <h4>Are you sure to delete this note?</h4>
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
              <button type="button" className={`btn btn-${state.mode==="dark"?"info":"dark"}`} onClick={handledel}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {note.length===0 && 'No notes to display'}
        </div>
        {
         note.map((notes) => {
          return (
                <div className="col-4"  key={notes._id}>
              <Noteitem
                deletenote={deletenotes}
                updatenote={updatenote}
                note={notes}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Notes;
