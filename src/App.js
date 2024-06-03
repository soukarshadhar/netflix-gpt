import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import BrowseContainer from "./components/BrowseContainer";
import { Provider, useSelector } from "react-redux";
import store from "./store/appStore";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (pathname === "/browse" && !user) {
      navigate("/");
    }

    if (
      (pathname === "/" || pathname === "/login" || pathname === "/signup") &&
      !!user
    ) {
      navigate("/browse");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={pathname === "/browse" ? "" : "app-container"}>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <UserForm />,
      },
      {
        path: "signup",
        element: <UserForm type="signup" />,
      },
      {
        path: "browse",
        element: <BrowseContainer />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
