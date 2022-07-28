import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage,
  ProjectsListpage,
  ProjectCreatePage,
  ProjectDetailsPage,
  SubmittalListpage
} from "pages";
import { Navbar } from "components";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" component={ProjectsListpage} />
          <Route path="/project/new" component={ProjectCreatePage} />
          <Route path="/project/details" component={ProjectDetailsPage} />
          <Route path="/submittals" component={SubmittalListpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
