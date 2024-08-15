import { useContext, useEffect } from "react";
import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import noteContext from "./context/Notes/noteContext";
import Firstpage from "./components/Firstpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";

function App() {
  const a = useContext(noteContext);
  useEffect(() => {
    window.onbeforeunload = function (e) {
      window.localStorage.unloadTime = JSON.stringify(new Date());
      };
      window.onload = function () {
      let loadTime = new Date();
      let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
      let refreshTime = loadTime.getTime() - unloadTime.getTime();
      
      if(refreshTime>30*60*1000)
      {
        window.localStorage.removeItem("token");
      window.location.reload();
      }
      
      };
    return () => {
    
    };
  }, []);
 
  return (
    <>
      <Router>
        <Navbar />
        <Alert alart={a.alart} />
        <div className="container">
          <Switch>
            <Route exact path={`${localStorage.getItem('token')?"/home":"/"}`}>
              <Firstpage />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact/>
            </Route>
            <Route exact path={`${localStorage.getItem('token')?"/":"/home"}`}>
              <Home />
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
