import { useContext } from "react";
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
