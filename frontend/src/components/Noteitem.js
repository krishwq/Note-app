import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";

function Noteitem(props) {
  const a = useContext(noteContext);

  const { note } = props;
  return (
    <>
      <div
        className="card my-3 rounded"
        style={{
          border: "1px solid",
          borderColor: a.state.mode === "dark" ? "white" : "black",
          boxShadow:
            a.state.mode === "dark"
              ? "0px 0px 8px 0.5px white"
              : "0px 0px 10px 1px black",
        }}
      >
        <div
          className="card-body rounded"
          style={{
            backgroundColor: a.state.mode === "dark" ? "#165185" : "#e1ffff",
            color: a.state.mode === "dark" ? "white" : "black",
          }}
        >
          <h5 className="card-title">{note.title}</h5>
          <div
            style={{ overflowY: "auto", height: "100px", marginTop: "10px" }}
          >
            <p className="card-text">{note.description}</p>
          </div>
          <span className="float-start">
            {new Date(note.date).toGMTString()}
            {}
          </span>
          <span className="float-end">
            <em title="Delete Note">
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  props.deletenote(note);
                }}
              ></i>
            </em>
            <em title="Edit Note">
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  props.updatenote(note);
                }}
              ></i>
            </em>
          </span>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
