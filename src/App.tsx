import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage,
  ProjectsListpage,
  ProjectCreatePage,
  ProjectDetailsPage,
  SubmittalListpage,
  SubmittalDetailspage,
  MaterialListpage
} from "pages";
import { Navbar } from "components";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" exact component={ProjectsListpage} />
          <Route path="/project/new" exact component={ProjectCreatePage} />
          <Route
            path="/project/details/:projectId/submittals"
            exact
            component={SubmittalListpage}
          />
          <Route path="/submittals/details" component={SubmittalDetailspage} />
          <Route
            path="/project/details/:projectId/materials"
            exact
            component={MaterialListpage}
          />
          <Route
            path="/project/details/:projectId"
            component={ProjectDetailsPage}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
