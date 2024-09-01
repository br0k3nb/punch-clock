import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import SignIn from "../../screens/SignIn.tsx";

export default function LoginRedirect() {
  const auth = useAuth();

  return <> {!auth.userIsLoggedIn ? <Navigate to={`/create/form`} /> : <SignIn />} </>
}
