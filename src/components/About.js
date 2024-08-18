import React,{useContext} from 'react';
import noteContext from "../context/Notes/noteContext";


const About = () => {
  const a = useContext(noteContext);

  let mystyle={
    color:a.state.mode==='dark'?'white':'black',
    backgroundColor:a.state.mode==='dark'?'rgb(36 74 104)':'white'
  }
  let styleacor={
    color:a.state.mode==='dark'?'white':'black',
    backgroundColor:a.state.mode==='dark'?'rgb(20 53 79)':'#e1f5f8'
  }
  return (
    <div>
      <div className="container my-5" >
    <h2 className="my-3 ms-3" style={{color:a.state.mode==='dark'?'white':'black'}}>About Us</h2>
      <div className="accordion px-3" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={styleacor}
            >
              <strong>Use it everywhere</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
            Notes stay updated across all your devices, automatically and in real time. There's no “sync” button: It just works.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={styleacor}
            >
              <strong>Stay organized</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
            Add tags to find notes quickly with instant searching.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={styleacor}
            >
              <strong>Brouser Compatable</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
             This iNotebook app works in any web brouser such a crome,Firefox,Internet explorer,Safari,Opera.
             You can use it in any device and it is completely responsive.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              style={styleacor}
            >
              <strong>Go back in time</strong>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
            Notes are backed up with every change, so you can see what you noted last week or last month.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
              style={styleacor}
            >
              <strong>It's free</strong>
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
            Apps, backups, syncing, sharing - it's all completely free.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
              style={styleacor}
            >
              <strong>It's Safe</strong>
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={mystyle}>
           Notes are completely safe.No one can access the database and no one can see your notes.
            </div>
          </div>
        </div>
      </div>
</div>
</div>
  );
}

export default About;
