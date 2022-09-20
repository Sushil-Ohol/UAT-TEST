import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "hooks/useAuth";

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({ ...rest }: PrivateRouteProps) {
  const auth = useAuth();
  if (auth?.currentUser == null) return <Redirect to="/" />;
  return <Route {...rest} />;
}

export default PrivateRoute;
