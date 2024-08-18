import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const noteinitial = [];
  const s1 = {
    mode: "dark",
  };
  const [state, setState] = useState(s1);
  const [note, setnote] = useState(noteinitial);
  const [alart, setAlart] = useState(null);

  //get  note
  const getnote = async () => {
    const response = await fetch(`https://note-app-4-pdgm.onrender.com/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken:localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnote(json);
  };

  //add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`https://note-app-4-pdgm.onrender.com/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const notes = await response.json();
    setnote(note.concat(notes));
  };
  //delete a note
  const deletenote = async (id) => {
    const response = await fetch(`https://note-app-4-pdgm.onrender.com/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken:localStorage.getItem('token')
      },
    });
    const newNote = note.filter((note) => {
      return (note._id !== id);
    });
    setnote(newNote);
    const json =await response.json();
    console.log(json);
  };
  //edit of note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`https://note-app-4-pdgm.onrender.com/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken:localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newnotes = JSON.parse(JSON.stringify(note));
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnote(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{
        state,
        setState,
        note,
        setnote,
        alart,
        setAlart,
        addnote,
        deletenote,
        editnote,
        getnote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
