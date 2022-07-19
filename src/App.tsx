import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage,
  ProjectsListpage,
  ProjectCreatePage,
  ProjectDetailsPage
} from "pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" component={ProjectsListpage} />
          <Route path="/project/new" component={ProjectCreatePage} />
          <Route path="/project/details" component={ProjectDetailsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
