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
import { Provider, useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/utils/firebase";
import store from "./store/appStore";
import { addUser } from "./store/user";
import { FORM_TYPE } from "./utils/constants";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user);

  useEffect(() => {
    const authChangeListener = onAuthStateChanged(auth, (user) => {
      const isUserLoggedIn = !!user;

      if (
        (pathname === "/" || pathname === "/login" || pathname === "/signup") &&
        isUserLoggedIn
      ) {
        !storeUser &&
          dispatch(
            addUser({ displayName: user.displayName, email: user.email })
          );
        navigate("/browse");
      }

      if (pathname === "/browse" && !isUserLoggedIn) {
        navigate("/");
      }

      if (pathname === "/browse" && isUserLoggedIn) {
        !storeUser &&
          dispatch(
            addUser({ displayName: user.displayName, email: user.email })
          );
      }
    });

    return () => {
      authChangeListener();
    };
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
        element: <UserForm type={FORM_TYPE.signIn} />,
      },
      {
        path: "signup",
        element: <UserForm type={FORM_TYPE.signUp} />,
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
