import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterComponent from "./components/register.component";
import LoginComponent from "./components/login.component";
import UserComponent from "./components/user.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/" exact component={LoginComponent} />
        <Route path="/register" exact component={RegisterComponent} />
        <Route path="/user" exact component={UserComponent} />
      </Router>
    </div>
  );
}

export default App;
