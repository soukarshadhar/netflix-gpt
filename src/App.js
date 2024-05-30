import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import Browse from "./components/Browse";
import { Provider } from "react-redux";
import store from "./store/appStore";

const AppLayout = () => {
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
