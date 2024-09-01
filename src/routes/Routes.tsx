import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../screens/Home/index";
import NewForm from "../screens/NewForm";
import MyForms from "../screens/MyForms";
import Page404 from "../screens/Page404/index";

import useAuth from "../hooks/useAuth";

import AuthProvider from "../context/AuthCtx";
import NavbarContext from "../context/NavbarCtx";
import GlobalLoader from "../components/GlobalLoader";
import LoginRedirect from "./components/LoginRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import { AxiosInterceptor } from "../components/CustomHttpInterceptor";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavbarContext>
          <CustomRoutes />
        </NavbarContext>
      </AuthProvider>
    </BrowserRouter>
  );
}

export function CustomRoutes() {
  const auth = useAuth();

  return (
    <AxiosInterceptor>
      <Routes>
        <Route path="/" element={<LoginRedirect />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={auth.isLoading ? <GlobalLoader /> : <Home />} />
        </Route>
        <Route path="/create/form" element={<ProtectedRoute />}>
          <Route index element={auth.isLoading ? <GlobalLoader /> : <NewForm />} />
        </Route>
        <Route path="/view/forms" element={<ProtectedRoute />}>
          <Route index element={auth.isLoading ? <GlobalLoader /> : <MyForms />} />
        </Route>
        {/* <Route path="/sign-up" element={ <SignUp /> } /> */}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </AxiosInterceptor>
  );
}
