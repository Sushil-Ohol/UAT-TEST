import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Login,
  HomePage,
  ProjectsListpage,
  ProjectCreatePage,
  ProjectDetailsPage,
  SubmittalListpage,
  SubmittalDetailspage,
  MaterialListpage
} from "pages";
import { Navbar } from "components";
import AuthProvider from "AuthProvider";
import PrivateRoute from "ProtectedRoute";

function DefaultLayout() {
  return (
    <div className="container">
      <Navbar />

      <PrivateRoute path="/home" exact component={HomePage} />
      <PrivateRoute path="/projects" exact component={ProjectsListpage} />
      <PrivateRoute
        path="/project/details/:projectId/submittals"
        exact
        component={SubmittalListpage}
      />
      <PrivateRoute
        path="/submittals/details"
        component={SubmittalDetailspage}
      />
      <PrivateRoute
        path="/project/details/:projectId/materials"
        exact
        component={MaterialListpage}
      />
      <PrivateRoute
        path="/project/details/:projectId"
        component={ProjectDetailsPage}
      />
      <PrivateRoute path="/project/new" exact component={ProjectCreatePage} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact component={DefaultLayout} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
