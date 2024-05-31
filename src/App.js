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
import Browse from "./components/Browse";
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
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className="netflix-background z-0">
            <Home />
          </div>
        ),
      },
      {
        path: "login",
        element: (
          <div className="netflix-background z-0">
            <UserForm />
          </div>
        ),
      },
      {
        path: "signup",
        element: (
          <div className="netflix-background z-0">
            <UserForm type="signup" />
          </div>
        ),
      },
      {
        path: "browse",
        element: <Browse />,
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
